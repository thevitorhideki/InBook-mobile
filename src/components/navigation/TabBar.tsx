import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import clsx from 'clsx';
import { router } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../text';

enum Tab {
  Home,
  Explore,
  Library,
}

export default function TabBar() {
  const [selectedTab, setSelectedTab] = useState(Tab.Home);

  const themeTabIconDefault = useThemeColor({}, 'tabIconDefault');
  const themeTabIconSelected = useThemeColor({}, 'tabIconSelected');

  return (
    <View className="absolute bottom-0 w-full flex-row items-center justify-around border-t border-zinc-200 bg-white py-3 dark:border-zinc-900 dark:bg-[#09090bf8]">
      <TouchableOpacity
        className="flex-1 items-center"
        onPress={() => {
          setSelectedTab(Tab.Home);
          router.navigate('/');
        }}
        activeOpacity={0.5}
      >
        <Ionicons
          name={selectedTab === Tab.Home ? 'home' : 'home-outline'}
          size={28}
          color={selectedTab === Tab.Home ? themeTabIconSelected : themeTabIconDefault}
        />
        <Text
          className={clsx('font-semibold text-sm', {
            'color-zinc-400 dark:color-zinc-500': selectedTab !== Tab.Home,
            'color-black dark:color-white': selectedTab === Tab.Home,
          })}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-1 items-center"
        onPress={() => {
          setSelectedTab(Tab.Explore);
          router.navigate('/explore');
        }}
        activeOpacity={0.5}
      >
        <Ionicons
          name={selectedTab === Tab.Explore ? 'search' : 'search-outline'}
          size={28}
          color={selectedTab === Tab.Explore ? themeTabIconSelected : themeTabIconDefault}
        />
        <Text
          className={clsx('font-semibold text-sm', {
            'color-zinc-400 dark:color-zinc-500': selectedTab !== Tab.Explore,
            'color-black dark:color-white': selectedTab === Tab.Explore,
          })}
        >
          Explorar
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-1 items-center"
        onPress={() => {
          setSelectedTab(Tab.Library);
          router.navigate('/library');
        }}
        activeOpacity={0.5}
      >
        <Ionicons
          name={selectedTab === Tab.Library ? 'bookmarks' : 'bookmarks-outline'}
          size={28}
          color={selectedTab === Tab.Library ? themeTabIconSelected : themeTabIconDefault}
        />
        <Text
          className={clsx('font-semibold text-sm', {
            'color-zinc-400 dark:color-zinc-500': selectedTab !== Tab.Library,
            'color-black dark:color-white': selectedTab === Tab.Library,
          })}
        >
          Biblioteca
        </Text>
      </TouchableOpacity>
    </View>
  );
}
