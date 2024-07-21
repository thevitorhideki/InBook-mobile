import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { useSession } from '@/hooks/authContext';
import { authServer } from '@/server/auth-server';
import { colors } from '@/styles/colors';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { KeyRoundIcon, User } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { Alert, View } from 'react-native';

export default function SingIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { setSession, fetchUserData } = useSession();
  const { colorScheme } = useColorScheme();

  const handleSignIn = async () => {
    if (!username || !password) {
      Alert.alert('Login', 'Preencha os seus dados para realizar o login com sua conta');
      return;
    }

    try {
      setIsSigningIn(true);
      const tokens = await authServer.signIn({ username, password });

      await SecureStore.setItemAsync('refresh_token', tokens.refresh_token);
      setSession(tokens.access_token);
      fetchUserData();
      router.replace('/');
    } catch (error) {
      Alert.alert('Login', 'Username ou senha incorretos');
    } finally {
      setIsSigningIn(false);
    }
  };

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
        <Button onPress={handleSignIn} isLoading={isSigningIn}>
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
