import { SignUp } from '@/api/getUser';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';

export default function Index() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const body = { username, password };

    try {
      const tokens = await SignUp(body);
      console.log(tokens);
      Alert.alert('Login bem-sucedido!', 'Você está logado!');
    } catch (err) {
      Alert.alert(err.message, 'Tente novamente!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        keyboardType="default"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        keyboardType="visible-password"
        autoCapitalize="none"
      />
      <Button title="Sign-up" onPress={handleSignUp} />
      <Link href="/auth/sign-in">Sign-in</Link>
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
