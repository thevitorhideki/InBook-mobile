import { useSession } from '@/hooks/authContext';
import { UserData, userServer } from '@/server/user-server';
import { Image } from 'expo-image';
import { Redirect, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from './text';

export function Header() {
  const [userData, setUserData] = useState({} as UserData);
  const pathname = usePathname();
  const { signOut } = useSession();

  async function fetchUserData() {
    try {
      const data = await userServer.getUserData();

      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData.id) {
    <Redirect href={'/sign-in'} />;
  }

  return (
    <View className="w-full flex-row items-center justify-between p-5">
      <Text className="font-semibold text-3xl">
        {(pathname === '/' &&
          `Olá, ${userData?.profile ? userData.profile.firstName : 'bem vindo de volta'}!`) ||
          (pathname === '/explore' && 'Explorar') ||
          (pathname === '/library' && 'Biblioteca')}
      </Text>
      <Pressable
        onPress={() => {
          signOut();
        }}
      >
        <Image
          style={{ width: 36, height: 36, borderRadius: 20 }}
          source={userData?.profile?.avatarUrl}
          contentFit="cover"
          transition={500}
        />
      </Pressable>
    </View>
  );
}
