import { useSession } from '@/hooks/authContext';
import { UserData, userServer } from '@/server/user-server';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Loading } from './loading';
import { Text } from './text';

export function Header() {
  const [userData, setUserData] = useState({} as UserData);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const { signOut } = useSession();

  async function fetchUserData() {
    try {
      const data = await userServer.getUserData();

      setUserData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUserData(false);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loadingUserData) {
    return <Loading />;
  }

  return (
    <View className="w-full flex-row items-center justify-between p-5">
      <Text className="font-semibold text-3xl">
        Olá, {userData?.profile ? userData.profile.firstName : 'bem vindo de volta'}!
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
