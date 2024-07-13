import { Text as RNText, TextProps as RNTextProps } from 'react-native';

interface TextProps extends RNTextProps {}

const Text: React.FC<TextProps> = ({ className, ...props }) => {
  if (className?.includes('color-') || className?.includes('dark:color-')) {
    return <RNText className={className} {...props} />;
  }

  return <RNText className={`dark:color-gray-300 ${className}`} {...props} />;
};

export { Text };
