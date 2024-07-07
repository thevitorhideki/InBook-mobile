import Book from '@/components/Book';
import ReviewCard from '@/components/ReviewCard';
import Text from '@/components/Text';
import VerticalLine from '@/components/VerticalLine';
import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Page() {
  const themeBackgroundStyle = useThemeColor({}, 'background');
  const themeCardStyle = useThemeColor({}, 'card');
  const themeBorderStyle = useThemeColor({}, 'border');
  const themeIconStyle = useThemeColor({}, 'icon');
  const themeTabDefault = useThemeColor({}, 'tabIconDefault');
  const themeTabSelected = useThemeColor({}, 'tabIconSelected');
  const themeRecommendationColor = useThemeColor({}, 'recommendationColor');

  const { slug, cover, author, duration, pages } = useLocalSearchParams();
  const [tab, setTab] = useState('Sinopse');

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeBackgroundStyle }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Link href="/">
            <FontAwesome6
              name="chevron-left"
              size={24}
              color={themeIconStyle}
            />
          </Link>
          <Link href="#">
            <FontAwesome6
              name="ellipsis-vertical"
              size={24}
              color={themeIconStyle}
            />
          </Link>
        </View>
        <View style={{ gap: 14 }}>
          <Image
            source={cover}
            style={{ width: 'auto', height: 200, borderRadius: 8 }}
          />
          <View style={styles.bookInfo}>
            <View style={{ flex: 1 }}>
              <Text weight="bold" fontSize={20}>
                {slug}
              </Text>
              <Text weight="regular" fontSize={14}>
                {author}
              </Text>
              <Text weight="light" fontSize={12}>
                {duration} | {pages} páginas
              </Text>
            </View>
          </View>
          <Text
            weight="bold"
            fontSize={12}
            style={{ textAlign: 'center', color: themeRecommendationColor }}
          >
            92% dos leitores recomendam esse livro{' '}
            <Text fontSize={10} style={{ color: themeRecommendationColor }}>
              (100)
            </Text>
          </Text>
          <View style={styles.buttonsContainer}>
            <Link href={'#'}>
              <View
                style={[styles.playButton, { backgroundColor: themeCardStyle }]}
              >
                <MaterialCommunityIcons
                  name="glasses"
                  size={24}
                  color={themeIconStyle}
                />
                <Text style={{ textAlign: 'center' }}>Ler</Text>
              </View>
            </Link>
            <Link href={'#'}>
              <View
                style={[styles.playButton, { backgroundColor: themeCardStyle }]}
              >
                <MaterialCommunityIcons
                  name="headphones"
                  size={24}
                  color={themeIconStyle}
                />
                <Text style={{ textAlign: 'center' }}>Escutar</Text>
              </View>
            </Link>
          </View>
        </View>
        <View style={styles.tabs}>
          <Text
            weight="bold"
            style={
              tab === 'Sinopse'
                ? [styles.tabActive, { borderColor: themeTabSelected }]
                : [
                    styles.tabInactive,
                    { borderColor: themeTabDefault, color: themeTabDefault },
                  ]
            }
            onPress={() => {
              setTab('Sinopse');
            }}
          >
            Sinopse
          </Text>
          <Text
            weight="bold"
            style={
              tab === 'Author'
                ? [styles.tabActive, { borderColor: themeTabSelected }]
                : [
                    styles.tabInactive,
                    { borderColor: themeTabDefault, color: themeTabDefault },
                  ]
            }
            onPress={() => {
              setTab('Author');
            }}
          >
            Autor
          </Text>
          <Text
            weight="bold"
            style={
              tab === 'Reviews'
                ? [styles.tabActive, { borderColor: themeTabSelected }]
                : [
                    styles.tabInactive,
                    { borderColor: themeTabDefault, color: themeTabDefault },
                  ]
            }
            onPress={() => {
              setTab('Reviews');
            }}
          >
            Avaliações
          </Text>
        </View>
        {(tab === 'Sinopse' && (
          <View style={{ marginBottom: 22 }}>
            <Text style={{ textAlign: 'justify' }}>
              A obra retrata momentos de extrema pobreza e tristeza, o que
              demonstra a crítica social extremamente presente nas obras de
              Victor Hugo. Afinal, o título “Os Miseráveis” não é à toa: vários
              personagens passam por situações de extrema pobreza, fome e
              miséria, o que destaca a desigualdade social da França do século
              XIX.
            </Text>
          </View>
        )) ||
          (tab === 'Author' && (
            <View style={{ gap: 14, marginBottom: 22 }}>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Image
                  source={cover}
                  style={{ height: 70, width: 70, borderRadius: 35 }}
                />
                <View style={{ flex: 1 }}>
                  <Text weight="bold" fontSize={14}>
                    {author}
                  </Text>
                  <Text style={{ textAlign: 'justify' }}>
                    Victor Hugo foi um dos maiores escritores franceses do
                    século XIX. Além de “Os Miseráveis”, ele é autor de outras
                    obras famosas, como “O Corcunda de Notre-Dame” e “Les
                    Contemplations”. Hugo também foi político e ativista, tendo
                    sido eleito para a Assembleia Nacional Francesa em 1848.
                  </Text>
                </View>
              </View>
              <View style={{ gap: 6 }}>
                <Text fontSize={14}>Outras obras de {author}</Text>
                <Book
                  title="Dom Quixote"
                  author="Miguel de Servantes"
                  duration="5h48min"
                  pages={321}
                  cover={cover}
                />
              </View>
            </View>
          )) ||
          (tab === 'Reviews' && (
            <View style={{ alignItems: 'center', marginBottom: 22 }}>
              <Text weight="bold" fontSize={14}>
                Opinião de 100 leitores
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 24,
                  marginTop: 12,
                }}
              >
                <View style={{ alignItems: 'center' }}>
                  <Text weight="bold" fontSize={12}>
                    98%
                  </Text>
                  <Text weight="bold" fontSize={12}>
                    gostaram do conteúdo
                  </Text>
                </View>
                <VerticalLine />
                <View style={{ alignItems: 'center' }}>
                  <Text weight="bold" fontSize={12}>
                    97%
                  </Text>
                  <Text weight="bold" fontSize={12}>
                    gostaram da narração
                  </Text>
                </View>
              </View>
              <View
                style={{
                  gap: 8,
                  marginTop: 16,
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <View
                  style={[
                    styles.reviewButton,
                    {
                      backgroundColor: themeCardStyle,
                      borderColor: themeBorderStyle,
                    },
                  ]}
                >
                  <Link href="/">
                    <Text weight="bold" fontSize={12}>
                      Avalie essa obra
                    </Text>
                  </Link>
                </View>
                <ReviewCard
                  title="Adorei!"
                  content="Através de personagens memoráveis como Jean Valjean e o inspetor Javert, o livro revela a profundidade da miséria humana e a capacidade de transformação. É uma leitura obrigatória para quem aprecia narrativas poderosas e reflexões sociais profundas."
                  recommended={true}
                />
                <ReviewCard
                  title="Adorei!"
                  content="Através de personagens memoráveis como Jean Valjean e o inspetor Javert, o livro revela a profundidade da miséria humana e a capacidade de transformação. É uma leitura obrigatória para quem aprecia narrativas poderosas e reflexões sociais profundas."
                  recommended={true}
                />
                <ReviewCard
                  title="Adorei!"
                  content="Através de personagens memoráveis como Jean Valjean e o inspetor Javert, o livro revela a profundidade da miséria humana e a capacidade de transformação. É uma leitura obrigatória para quem aprecia narrativas poderosas e reflexões sociais profundas."
                  recommended={false}
                />
                <View
                  style={[
                    styles.reviewButton,
                    {
                      backgroundColor: themeCardStyle,
                      borderColor: themeBorderStyle,
                    },
                  ]}
                >
                  <Link href="/">
                    <Text weight="bold" fontSize={12}>
                      Ver todas as avaliações
                    </Text>
                  </Link>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 8,
  },

  bookInfo: {
    flexDirection: 'row',
  },

  buttonsContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  playButton: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },

  tabs: {
    flexDirection: 'row',
    paddingVertical: 20,
  },

  tabActive: {
    flex: 1,
    paddingVertical: 4,
    textAlign: 'center',
    fontSize: 14,
    borderBottomWidth: 2,
  },

  tabInactive: {
    flex: 1,
    paddingVertical: 4,
    textAlign: 'center',
    fontSize: 14,
    borderBottomWidth: 2,
  },

  reviewButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 2,
    borderRadius: 8,
  },
});
