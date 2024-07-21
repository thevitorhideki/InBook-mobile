import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { useSession } from '@/hooks/authContext';
import { authServer } from '@/server/auth-server';
import { colors } from '@/styles/colors';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Check, KeyRoundIcon, Mail, User, X } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

export default function SingUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [rules, setRules] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    length: false,
    username: false,
  });
  const [isSingingUp, setIsSigningUp] = useState(false);
  const { colorScheme } = useColorScheme();
  const { setSession } = useSession();

  const handleSingUp = async () => {
    if (!username || !email || !password) {
      Alert.alert('Cadastro', 'Preencha todos os campos para se cadastrar');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Cadastro', 'Digite um e-mail válido');
      return;
    }

    try {
      setIsSigningUp(true);
      const tokens = await authServer.signUp({ username, email, password });
      await SecureStore.setItemAsync('refresh_token', tokens.refresh_token);
      setSession(tokens.access_token);
      router.replace('/profile');
    } catch (error) {
      if (error.message === 'Username already exists') {
        setIsUsernameValid(false);
        Alert.alert('Cadastro', 'Este username já está em uso');
      } else if (error.message === 'Email already exists') {
        setIsEmailValid(false);
        Alert.alert('Cadastro', 'Este e-mail já está em uso');
      }
    } finally {
      setIsSigningUp(false);
    }
  };

  useEffect(() => {
    if (password.length < 8) {
      setRules((prev) => ({ ...prev, length: false }));
    } else {
      setRules((prev) => ({ ...prev, length: true }));
    }

    if (!/\d/.test(password)) {
      setRules((prev) => ({ ...prev, number: false }));
    } else {
      setRules((prev) => ({ ...prev, number: true }));
    }

    if (!/[a-z]/.test(password)) {
      setRules((prev) => ({ ...prev, lowercase: false }));
    } else {
      setRules((prev) => ({ ...prev, lowercase: true }));
    }

    if (!/[A-Z]/.test(password)) {
      setRules((prev) => ({ ...prev, uppercase: false }));
    } else {
      setRules((prev) => ({ ...prev, uppercase: true }));
    }

    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password)) {
      setRules((prev) => ({ ...prev, special: false }));
    } else {
      setRules((prev) => ({ ...prev, special: true }));
    }

    if (username && password.includes(username)) {
      setRules((prev) => ({ ...prev, username: false }));
    } else {
      setRules((prev) => ({ ...prev, username: true }));
    }
  }, [password, username]);

  useEffect(() => {
    if (Object.values(rules).every((rule) => rule)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }, [rules]);

  return (
    <View className="flex-1 justify-center gap-6">
      <View>
        <Text className="font-semibold text-3xl">Seja bem vindo ao InBook!</Text>
        <Text className="text-base">
          Preencha os seus dados para criar uma conta e aproveitar o nosso grande acervo de obras
        </Text>
      </View>
      <View className="gap-3">
        <Input
          variant="secondary"
          style={{
            borderColor: isUsernameValid ? colors[colorScheme].border : colors[colorScheme].red,
          }}
        >
          <User size={20} color={colors[colorScheme].icon} />
          <Input.Field
            placeholder="Username"
            onChangeText={(value) => {
              setUsername(value);
              setIsUsernameValid(true);
            }}
          />
        </Input>
        <Input
          variant="secondary"
          style={{
            borderColor: isEmailValid ? colors[colorScheme].border : colors[colorScheme].red,
          }}
        >
          <Mail size={20} color={colors[colorScheme].icon} />
          <Input.Field
            placeholder="E-mail"
            onChangeText={(value) => {
              setEmail(value);
              setIsEmailValid(true);
            }}
          />
        </Input>
        <Input
          variant="secondary"
          style={{
            borderColor: !isPasswordValid ? colors[colorScheme].red : colors[colorScheme].border,
          }}
        >
          <KeyRoundIcon size={20} color={colors[colorScheme].icon} />
          <Input.Field placeholder="Senha" onChangeText={setPassword} />
        </Input>
        {!isPasswordValid && (
          <>
            <View className="flex-row items-center gap-2">
              {!rules.uppercase ? (
                <X size={20} color={colors[colorScheme].red} />
              ) : (
                <Check size={20} color={colors[colorScheme].green} />
              )}
              <Text
                style={{
                  color: !rules.uppercase ? colors[colorScheme].red : colors[colorScheme].green,
                }}
              >
                Uma letra maiúscula
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              {!rules.lowercase ? (
                <X size={20} color={colors[colorScheme].red} />
              ) : (
                <Check size={20} color={colors[colorScheme].green} />
              )}
              <Text
                style={{
                  color: !rules.lowercase ? colors[colorScheme].red : colors[colorScheme].green,
                }}
              >
                Uma letra minúscula
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              {!rules.number ? (
                <X size={20} color={colors[colorScheme].red} />
              ) : (
                <Check size={20} color={colors[colorScheme].green} />
              )}
              <Text
                style={{
                  color: !rules.number ? colors[colorScheme].red : colors[colorScheme].green,
                }}
              >
                Um número
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              {!rules.special ? (
                <X size={20} color={colors[colorScheme].red} />
              ) : (
                <Check size={20} color={colors[colorScheme].green} />
              )}
              <Text
                style={{
                  color: !rules.special ? colors[colorScheme].red : colors[colorScheme].green,
                }}
              >
                Um caractere especial
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              {!rules.length ? (
                <X size={20} color={colors[colorScheme].red} />
              ) : (
                <Check size={20} color={colors[colorScheme].green} />
              )}
              <Text
                style={{
                  color: !rules.length ? colors[colorScheme].red : colors[colorScheme].green,
                }}
              >
                No mínimo 8 caracteres
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              {!rules.username ? (
                <X size={20} color={colors[colorScheme].red} />
              ) : (
                <Check size={20} color={colors[colorScheme].green} />
              )}
              <Text
                style={{
                  color: !rules.username ? colors[colorScheme].red : colors[colorScheme].green,
                }}
              >
                Não deve conter o seu username
              </Text>
            </View>
          </>
        )}
        <Button onPress={handleSingUp} isLoading={isSingingUp}>
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
