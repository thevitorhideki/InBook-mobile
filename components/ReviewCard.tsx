import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, View } from 'react-native';
import Text from './Text';

interface IReviewCardProps {
  username: string;
  avatarUrl: string;
  title: string;
  content: string;
  recommended: boolean;
}

export default function ReviewCard(props: IReviewCardProps) {
  const themeCardStyle = useThemeColor({}, 'card');
  const themeBorderStyle = useThemeColor({}, 'border');
  const themeRecommendedColor = useThemeColor({}, 'recommendedColor');
  const themeNotRecommendedColor = useThemeColor({}, 'notRecommendedColor');
  const { username, avatarUrl, title, content, recommended } = props;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeCardStyle, borderColor: themeBorderStyle },
      ]}
    >
      <Text weight="bold" fontSize={12}>
        {title}
      </Text>
      <Text fontSize={12}>{content}</Text>
      <Text
        fontSize={12}
        style={{
          color: recommended ? themeRecommendedColor : themeNotRecommendedColor,
        }}
      >
        {recommended ? 'Recomendado' : 'Não recomendado'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    padding: 18,
    borderRadius: 8,
    borderWidth: 2,
  },
});
