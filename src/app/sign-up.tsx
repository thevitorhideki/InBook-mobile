import { Text } from '@/components/text';
import { useSession } from '@/hooks/authContext';
import { authServer } from '@/server/auth-server';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Button, TextInput, View } from 'react-native';

export default function SingUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useSession();

  async function handleSignUp() {
    try {
      const tokens = await authServer.signUp({ username, email, password });
      await SecureStore.setItemAsync('refresh_token', tokens.refresh);
      signIn(tokens.access_token);
      router.replace('/');
    } catch (error) {
      console.error(error);
    } finally {
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        className="rounded-lg placeholder:color-zinc-400 dark:color-zinc-300 dark:placeholder:color-zinc-500"
      />
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        className="rounded-lg placeholder:color-zinc-400 dark:color-zinc-300 dark:placeholder:color-zinc-500"
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        className="rounded-lg placeholder:color-zinc-400 dark:color-zinc-300 dark:placeholder:color-zinc-500"
      />
      <Button onPress={handleSignUp} title="Sign Up" />
      <Text>
        Já possui uma conta?{' '}
        <Text
          className="font-semibold"
          onPress={() => {
            router.replace('/sign-in');
          }}
        >
          Entre agora!
        </Text>
      </Text>
    </View>
  );
}
