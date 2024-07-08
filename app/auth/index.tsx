import { signUp } from '@/api/sign-up';
import { useThemeColor } from '@/hooks/useThemeColor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';

export default function Index() {
  const themeTextColor = useThemeColor({}, 'text');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const body = { username, password };

    try {
      const tokens = await signUp(body);
      try {
        await AsyncStorage.setItem('tokens', JSON.stringify(tokens));
      } catch (error) {
        throw new Error(error.message);
      }
      Alert.alert('Login bem-sucedido!', 'Você está logado!');
      router.navigate('/');
    } catch (err) {
      Alert.alert(err.message, 'Tente novamente!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        placeholderTextColor={themeTextColor}
        value={username}
        onChangeText={setUsername}
        keyboardType="default"
        autoCapitalize="none"
        style={{ color: themeTextColor }}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={themeTextColor}
        value={password}
        onChangeText={setPassword}
        keyboardType="visible-password"
        autoCapitalize="none"
        style={{ color: themeTextColor }}
      />
      <Button title="Sign-up" onPress={handleSignUp} />
      <Link href="/auth/sign-in" style={{ color: themeTextColor }}>
        Sign-in
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
