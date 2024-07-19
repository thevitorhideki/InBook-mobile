import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { useSession } from '@/hooks/authContext';
import { colors } from '@/styles/colors';
import { router } from 'expo-router';
import { KeyRoundIcon, Mail, User } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { View } from 'react-native';

export default function SingUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useSession();
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-1 justify-center gap-6">
      <View>
        <Text className="font-semibold text-3xl">Seja bem vindo ao InBook!</Text>
        <Text className="text-base">
          Preencha os seus dados para criar uma conta e aproveitar o nosso grande acervo de obras
        </Text>
      </View>
      <View className="gap-3">
        <Input variant="secondary">
          <User size={20} color={colors[colorScheme].icon} />
          <Input.Field placeholder="Username" onChangeText={setUsername} />
        </Input>
        <Input variant="secondary">
          <Mail size={20} color={colors[colorScheme].icon} />
          <Input.Field placeholder="E-mail" onChangeText={setEmail} />
        </Input>
        <Input variant="secondary">
          <KeyRoundIcon size={20} color={colors[colorScheme].icon} />
          <Input.Field placeholder="Senha" onChangeText={setPassword} />
        </Input>
        <Button onPress={() => signUp(username, email, password)}>
          <Button.Title>Criar conta</Button.Title>
        </Button>
        <Text className="text-center">
          Já possui uma conta?{' '}
          <Text
            className="font-semibold underline"
            onPress={() => {
              router.replace('/sign-in');
            }}
          >
            Entre agora!
          </Text>
        </Text>
      </View>
    </View>
  );
}
