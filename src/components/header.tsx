import { useSession } from '@/hooks/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from './text';

type UserData = {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
};

export function Header() {
  const [userData, setUserData] = useState({} as UserData);
  const pathname = usePathname();
  const { signOut } = useSession();

  async function fetchUserData() {
    try {
      const data = await AsyncStorage.getItem('user');

      setUserData(JSON.parse(data || '{}'));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View className="w-full flex-row items-center justify-between p-5">
      <View>
        <Text className="font-semibold text-3xl">
          {(pathname === '/' && `Olá, ${userData.firstName ? userData.firstName : ''}`) ||
            (pathname === '/explore' && 'Explorar') ||
            (pathname === '/library' && 'Biblioteca')}
        </Text>
        {pathname === '/' && <Text>Bem vindo de volta 👋</Text>}
      </View>
      <Pressable
        onPress={() => {
          signOut();
        }}
      >
        <Image
          style={{ width: 36, height: 36, borderRadius: 20 }}
          source={userData.avatarUrl}
          contentFit="cover"
          transition={500}
        />
      </Pressable>
    </View>
  );
}
