import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import TabBar from '@/components/TabBar';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const themeBackgroundStyle = useThemeColor({}, 'background');

  return (
    <Tabs
      sceneContainerStyle={{ backgroundColor: themeBackgroundStyle }}
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'search' : 'search-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'bookmarks' : 'bookmarks-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
