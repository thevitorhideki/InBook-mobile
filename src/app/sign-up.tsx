import { Text } from '@/components/text';
import { useSession } from '@/hooks/authContext';
import { router } from 'expo-router';
import { useState } from 'react';
import { Button, TextInput, View } from 'react-native';

export default function SingUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useSession();

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
      <Button onPress={() => signUp(username, email, password)} title="Sign Up" />
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
