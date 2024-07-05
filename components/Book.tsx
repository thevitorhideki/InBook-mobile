import { Link } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';

type BookProps = {
  title: string;
  author: string;
  duration: string;
  pages: number;
  cover: any;
};

export default function Book({
  title,
  author,
  duration,
  pages,
  cover,
}: BookProps) {
  return (
    <Link href={{ pathname: '/books/[slug]', params: { slug: title } }}>
      <View style={styles.container}>
        <Image source={cover} style={styles.cover} />
        <View style={styles.info}>
          <Text weight="bold" style={styles.title}>
            {title}
          </Text>
          <Text style={styles.author}>{author}</Text>
          <View style={styles.bookLength}>
            <Text style={styles.duration}>{duration}</Text>
            <Text> | </Text>
            <Text style={styles.pages}>{pages} páginas</Text>
          </View>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 130,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#E7E7E7',
    borderRadius: 10,
  },

  cover: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },

  info: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  author: {
    fontSize: 10,
  },

  bookLength: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  duration: {
    fontSize: 10,
  },

  pages: {
    fontSize: 10,
  },
});
