import { colors } from '@/styles/colors';
import clsx from 'clsx';
import { useColorScheme } from 'nativewind';
import { Platform, TextInput, TextInputProps, View, ViewProps } from 'react-native';

type Variants = 'primary' | 'secondary' | 'tertiary';

type InputProps = {
  children: React.ReactNode;
  variant?: Variants;
} & ViewProps;

function Input({ children, variant = 'primary', className, ...rest }: InputProps) {
  return (
    <View
      className={clsx(
        'h-16 max-h-16 min-h-16 flex-row items-center gap-2',
        {
          'h-14 rounded-lg border-2 border-gray-600 px-4 dark:border-zinc-800':
            variant !== 'primary',
          'dark:bg-zinc-950': variant === 'secondary',
          'dark:bg-zinc-900': variant === 'tertiary',
        },
        className,
      )}
      {...rest}
    >
      {children}
    </View>
  );
}

function Field({ ...props }: TextInputProps) {
  const { colorScheme } = useColorScheme();

  return (
    <TextInput
      className="flex-1 font-regular text-lg text-zinc-950 dark:text-zinc-100"
      placeholderTextColor={colors.zinc[400]}
      cursorColor={colorScheme === 'dark' ? colors.zinc[100] : colors.zinc[400]}
      selectionColor={Platform.OS === 'ios' ? colors.zinc[100] : undefined}
      autoCorrect={false}
      {...props}
    />
  );
}

Input.Field = Field;

export { Input };
