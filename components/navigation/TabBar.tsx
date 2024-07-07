import { useThemeColor } from '@/hooks/useThemeColor';
import { Pressable, Text, View } from 'react-native';

export default function TabBar({ state, descriptors, navigation }) {
  const themeIconDefault = useThemeColor({}, 'tabIconDefault');
  const themeIconSelected = useThemeColor({}, 'tabIconSelected');
  const themeTabColor = useThemeColor({}, 'tabColor');

  return (
    <View
      style={{
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themeTabColor,
        position: 'absolute',
        bottom: 0,
        left: 0,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const icon = options.tabBarIcon({
          color: isFocused ? themeIconSelected : themeIconDefault,
          focused: state.index === index,
        });

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={
              isFocused ? { selected: true } : { selected: false }
            }
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1, alignItems: 'center' }}
            key={route.key}
          >
            {icon}
            <Text
              style={{
                color: isFocused ? themeIconSelected : themeIconDefault,
              }}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
