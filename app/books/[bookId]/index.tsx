import Author from '@/components/books/Author';
import Reviews from '@/components/books/Reviews';
import Sinopse from '@/components/books/Sinopse';
import Text from '@/components/Text';
import { useBookDetails } from '@/hooks/useBookDetails';
import { useThemeColor } from '@/hooks/useThemeColor';
import { styles } from '@/styles/bookPageStyles';
import { convertTimeToString } from '@/utils/convertTimeToString';
import { FontAwesome6 } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Page() {
  const { bookId } = useLocalSearchParams();
  const bookDetails = useBookDetails(bookId);

  const themeBackgroundStyle = useThemeColor({}, 'background');
  const themeCardStyle = useThemeColor({}, 'card');
  const themeIconStyle = useThemeColor({}, 'icon');
  const themeTabDefault = useThemeColor({}, 'tabIconDefault');
  const themeTabSelected = useThemeColor({}, 'tabIconSelected');
  const themeRecommendationColor = useThemeColor({}, 'recommendationColor');

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
            source={bookDetails.coverUrl}
            style={{
              width: 200,
              height: 200,
              borderRadius: 8,
              alignSelf: 'center',
            }}
          />
          <View style={styles.bookInfo}>
            <View style={{ flex: 1 }}>
              <Text weight="bold" fontSize={20}>
                {bookDetails.title}
              </Text>
              <Text weight="regular" fontSize={14}>
                {bookDetails.author.name}
              </Text>
              <Text weight="light" fontSize={12}>
                {convertTimeToString(bookDetails.duration)} |{' '}
                {bookDetails.pages} páginas
              </Text>
            </View>
          </View>
          <Text
            weight="bold"
            fontSize={12}
            style={{ textAlign: 'center', color: themeRecommendationColor }}
          >
            {bookDetails.recommendedPercentage}% dos leitores recomendam esse
            livro{' '}
            <Text fontSize={10} style={{ color: themeRecommendationColor }}>
              ({bookDetails.reviewCount})
            </Text>
          </Text>
          <View style={styles.buttonsContainer}>
            <Link href={'#'}>
              <View
                style={[styles.playButton, { backgroundColor: themeCardStyle }]}
              >
                <FontAwesome6 name="glasses" size={24} color={themeIconStyle} />
                <Text style={{ textAlign: 'center' }}>Ler</Text>
              </View>
            </Link>
            <Link href={'#'}>
              <View
                style={[styles.playButton, { backgroundColor: themeCardStyle }]}
              >
                <FontAwesome6
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
        {tab === 'Sinopse' ? (
          <Sinopse description={bookDetails.description} />
        ) : null}
        {tab === 'Author' ? (
          <Author
            authorDetails={bookDetails.author}
            bookDetails={bookDetails}
          />
        ) : null}
        {tab === 'Reviews' ? <Reviews bookDetails={bookDetails} /> : null}
      </ScrollView>
    </SafeAreaView>
  );
}
