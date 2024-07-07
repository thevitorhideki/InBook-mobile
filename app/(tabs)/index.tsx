import { Genre } from '@/api/enums/genre';
import UserIcon from '@/assets/images/user.jpeg';
import BookCollection from '@/components/BookCollection';
import Text from '@/components/Text';
import { Link } from 'expo-router';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text weight="bold" fontSize={20}>
            Olá, Daniela!
          </Text>
          <Link href="/auth">
            <View>
              <Image
                source={UserIcon}
                style={{ width: 36, height: 36, borderRadius: 90 }}
              />
            </View>
          </Link>
        </View>

        <BookCollection title="Histórias que você vai amar" type="relevance" />
        <BookCollection title="Aventura" type="genre" genre={Genre.ADVENTURE} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 20,
  },

  lastItem: {
    marginBottom: 82,
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
  },

  collection: {
    marginBottom: 14,
  },

  collectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  books: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 20,
    marginTop: 8,
  },
});
