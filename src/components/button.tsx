import clsx from 'clsx';
import {
  ActivityIndicator,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { Text } from './text';

type ButtonProps = {
  isLoading?: boolean;
} & TouchableOpacityProps;

function Button({ isLoading, children, className, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      className={clsx('w-full rounded-lg bg-zinc-950 py-4 dark:bg-zinc-900', className)}
      disabled={isLoading}
      activeOpacity={0.8}
      {...props}
    >
      {isLoading ? <ActivityIndicator className="text-zinc-100" /> : children}
    </TouchableOpacity>
  );
}

function Title({ children }: TextProps) {
  return <Text className="text-center font-semibold text-base color-zinc-50">{children}</Text>;
}

Button.Title = Title;

export { Button };
