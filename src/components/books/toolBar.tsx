import { colors } from '@/constants/colors';
import { Bookmark, Download, Glasses, Headphones } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../text';

export function ToolBar() {
  const { colorScheme } = useColorScheme();

  return (
    <View className="absolute bottom-0 left-5 mb-5 w-11/12 flex-row items-center justify-between gap-3 rounded-lg bg-zinc-200 dark:bg-zinc-900">
      <View className="flex-1 flex-row">
        <TouchableOpacity
          className="m-3 flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-zinc-300 p-3 dark:bg-zinc-800"
          activeOpacity={0.5}
        >
          <Headphones
            size={24}
            color={colorScheme === 'dark' ? colors.zinc[100] : colors.zinc[950]}
          />
          <Text className="text-base font-bold">Escutar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="my-3 flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-zinc-300 p-3 dark:bg-zinc-800"
          activeOpacity={0.5}
        >
          <Glasses size={24} color={colorScheme === 'dark' ? colors.zinc[100] : colors.zinc[950]} />
          <Text className="text-base font-bold">Escutar</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row">
        <TouchableOpacity
          className="my-3 flex-row gap-2 rounded-lg bg-zinc-300 p-3 dark:bg-zinc-800"
          activeOpacity={0.5}
        >
          <Download
            size={24}
            color={colorScheme === 'dark' ? colors.zinc[100] : colors.zinc[950]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="m-3 flex-row gap-2 rounded-lg bg-zinc-300 p-3 dark:bg-zinc-800"
          activeOpacity={0.5}
        >
          <Bookmark
            size={24}
            color={colorScheme === 'dark' ? colors.zinc[100] : colors.zinc[950]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
