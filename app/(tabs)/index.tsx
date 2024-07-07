import ARiquezaDasNacoes from '@/assets/images/a-riqueza-das-nacoes.jpg';
import DomCasmurro from '@/assets/images/dom-casmurro.jpg';
import DomQuixote from '@/assets/images/dom-quixote.jpg';
import Dracula from '@/assets/images/dracula.jpg';
import OPrincipe from '@/assets/images/o-principe.jpg';
import OsMiseraveis from '@/assets/images/os-miseraveis.jpg';
import OsSertoes from '@/assets/images/os-sertoes.jpg';
import Senhora from '@/assets/images/senhora.jpg';
import UserIcon from '@/assets/images/user.jpeg';
import Book from '@/components/Book';
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

        <View style={styles.collection}>
          <Text>Continue de onde parou</Text>
          <View style={styles.books}>
            <Book
              title="Dom Quixote"
              author="Miguel de Servantes"
              duration="5h48min"
              pages={321}
              cover={DomQuixote}
            />
          </View>
        </View>

        <View style={styles.collection}>
          <View style={styles.collectionHeader}>
            <Text>Histórias que você vai amar</Text>
            <Text weight="light" style={{ fontSize: 12 }}>
              Ver todos
            </Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.books}
          >
            <Book
              title="Dom Casmurro"
              author="Machado de Assis"
              duration="7h20min"
              pages={513}
              cover={DomCasmurro}
            />
            <Book
              title="Drácula"
              author="Bram Stoker"
              duration="6h35min"
              pages={420}
              cover={Dracula}
            />
            <Book
              title="Os Sertões"
              author="Euclides da Cunha"
              duration="5h21min"
              pages={368}
              cover={OsSertoes}
            />
          </ScrollView>
        </View>

        <View style={styles.collection}>
          <Text>Negócios</Text>
          <View style={styles.books}>
            <Book
              title="A Riqueza das Nações"
              author="Adam Smith"
              duration="5h48min"
              pages={360}
              cover={ARiquezaDasNacoes}
            />
            <Book
              title="O Príncipe"
              author="Nicolau Maquiavel"
              duration="7h20min"
              pages={512}
              cover={OPrincipe}
            />
          </View>
        </View>

        <View style={[styles.collection, styles.lastItem]}>
          <Text>Romances</Text>
          <View style={styles.books}>
            <Book
              title="Os Miseráveis"
              author="Victor Hugo"
              duration="5h48min"
              pages={300}
              cover={OsMiseraveis}
            />
            <Book
              title="Senhora"
              author="José de Alencar"
              duration="3h32min"
              pages={240}
              cover={Senhora}
            />
          </View>
        </View>
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
