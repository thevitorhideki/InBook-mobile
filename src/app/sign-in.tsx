import { Text } from '@/components/text';
import { useSession } from '@/hooks/authContext';
import { authServer } from '@/server/auth-server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { Button, TextInput, View } from 'react-native';

export default function SingIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useSession();

  async function handleSignIn() {
    try {
      const tokens = await authServer.signIn({ username, password });
      await AsyncStorage.setItem('refresh_token', tokens.refresh_token);
      signIn(tokens.access_token);
      router.replace('/');
    } catch (error) {
      console.error(error);
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
        placeholder="Password"
        onChangeText={setPassword}
        className="rounded-lg placeholder:color-zinc-400 dark:color-zinc-300 dark:placeholder:color-zinc-500"
      />
      <Button onPress={handleSignIn} title="Sign In" />
      <Text>
        Não tem uma conta?{' '}
        <Text
          className="font-semibold"
          onPress={() => {
            router.replace('/sign-up');
          }}
        >
          Crie agora!
        </Text>
      </Text>
    </View>
  );
}
