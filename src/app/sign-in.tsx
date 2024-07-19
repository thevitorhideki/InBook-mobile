import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { useSession } from '@/hooks/authContext';
import { colors } from '@/styles/colors';
import { router } from 'expo-router';
import { KeyRoundIcon, User } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { View } from 'react-native';

export default function SingIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useSession();
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-1 justify-center gap-6">
      <View>
        <Text className="font-semibold text-3xl">Seja bem vindo de volta ao InBook!</Text>
        <Text className="text-base">Preencha os seus dados para entrar com sua conta</Text>
      </View>
      <View className="gap-3">
        <Input variant="secondary">
          <User size={20} color={colors[colorScheme].icon} />
          <Input.Field placeholder="Username" onChangeText={setUsername} />
        </Input>
        <Input variant="secondary">
          <KeyRoundIcon size={20} color={colors[colorScheme].icon} />
          <Input.Field placeholder="Senha" onChangeText={setPassword} />
        </Input>
        <Button onPress={() => signIn(username, password)}>
          <Button.Title>Entrar</Button.Title>
        </Button>
        <Text className="text-center">
          Não tem uma conta?{' '}
          <Text
            className="font-semibold underline"
            onPress={() => {
              router.replace('/sign-up');
            }}
          >
            Crie agora!
          </Text>
        </Text>
      </View>
    </View>
  );
}
