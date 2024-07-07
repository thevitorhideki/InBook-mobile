import { useThemeColor } from '@/hooks/useThemeColor';
import { Link } from 'expo-router';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import Text from './Text';
import VerticalLine from './VerticalLine';

type BookProps = {
  title: string;
  author: string;
  duration: string;
  pages: number;
  cover: ImageSourcePropType;
};

export default function Book({
  title,
  author,
  duration,
  pages,
  cover,
}: BookProps) {
  const themeBackgroundStyle = useThemeColor({}, 'card');

  return (
    <Link
      href={{
        pathname: '/books/[slug]',
        params: {
          slug: title,
          cover: cover,
          author: author,
          duration: duration,
          pages: pages,
        },
      }}
    >
      <View
        style={[styles.container, { backgroundColor: themeBackgroundStyle }]}
      >
        <Image source={cover} style={styles.cover} />
        <View style={styles.info}>
          <Text weight="bold" fontSize={12} style={{ textAlign: 'center' }}>
            {title}
          </Text>
          <Text fontSize={10}>{author}</Text>
          <View style={styles.bookLength}>
            <Text weight="light" fontSize={10}>
              {duration}
            </Text>
            <VerticalLine />
            <Text weight="light" fontSize={10}>
              {pages} páginas
            </Text>
          </View>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 130,
    borderRadius: 10,
  },

  cover: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },

  info: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    gap: 2,
  },

  bookLength: {
    flexDirection: 'row',
    gap: 4,
  },
});
