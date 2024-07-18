import { Text } from '@/components/text';
import { useSession } from '@/hooks/authContext';
import { router } from 'expo-router';
import { useState } from 'react';
import { Button, TextInput, View } from 'react-native';

export default function SingIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, fetchUserData } = useSession();

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
      <Button onPress={() => signIn(username, password)} title="Sign In" />
      <Text>
        Não tem uma conta?{' '}
        <Text
          className="font-semibold"
          onPress={() => {
            router.replace('/sign-up');
            fetchUserData();
          }}
        >
          Crie agora!
        </Text>
      </Text>
    </View>
  );
}
