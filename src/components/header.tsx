import { useSession } from '@/hooks/authContext';
import { Image } from 'expo-image';
import { usePathname } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Text } from './text';

export function Header() {
  const pathname = usePathname();
  const { signOut, user } = useSession();

  return (
    <View className="w-full flex-row items-center justify-between py-5">
      <View>
        <Text className="font-semibold text-3xl">
          {(pathname !== '/explore' && pathname !== '/library' && `Olá, ${user?.firstName}`) ||
            (pathname === '/explore' && 'Explorar') ||
            (pathname === '/library' && 'Minha Biblioteca')}
        </Text>
      </View>
      <Pressable
        onPress={() => {
          signOut();
        }}
      >
        <Image
          style={{ width: 36, height: 36, borderRadius: 20 }}
          source={user?.avatarUrl}
          contentFit="cover"
          transition={500}
        />
      </Pressable>
    </View>
  );
}
