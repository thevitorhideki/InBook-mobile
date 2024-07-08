import ReviewABook from '@/api/review-a-book';
import Text from '@/components/Text';
import { useBookDetails } from '@/hooks/useBookDetails';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, View } from 'react-native';

export default function Reviews() {
  const { bookId } = useLocalSearchParams();

  const bookDetails = useBookDetails(bookId as string);

  const [enjoyedContent, setEnjoyedContent] = useState(null);
  const [enjoyedNarrator, setEnjoyedNarrator] = useState(null);
  const [recommended, setRecommended] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const themeRecommendedColor = useThemeColor({}, 'recommendedColor');
  const themeNotRecommendedColor = useThemeColor({}, 'notRecommendedColor');
  const themeRecommendedFillColor = useThemeColor({}, 'recommendedFillColor');
  const themeNotRecommendedFillColor = useThemeColor(
    {},
    'notRecommendedFillColor',
  );
  const themeBorderStyle = useThemeColor({}, 'border');
  const themeTextColor = useThemeColor({}, 'text');
  const themeCardStyle = useThemeColor({}, 'card');

  const handleSubmitReview = async () => {
    try {
      await ReviewABook(bookId as string, {
        enjoyedContent,
        enjoyedNarrator,
        recommended,
        title,
        content,
      });
      Alert.alert('Avaliação enviada!', 'Obrigado por avaliar a obra!');
      router.replace(`books/${bookId}/reviews/all-reviews`);
    } catch (error) {
      if (error.message === 'Usuário não logado') {
        Alert.alert(
          'Usuário não autenticado',
          'Você precisa estar logado para avaliar um livro',
        );
        router.replace('auth');
        return;
      } else if (error.message === 'Dados inválidos') {
        Alert.alert('Dados inválidos', 'Por favor, preencha todos os campos');
        return;
      } else if (error.message === 'Você já avaliou este livro') {
        Alert.alert('Avaliação duplicada', 'Você já avaliou este livro');
        router.back();
        return;
      }
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Image
        source={bookDetails.coverUrl}
        style={{
          width: 200,
          height: 200,
          borderRadius: 8,
          alignSelf: 'center',
        }}
      />

      <View style={{ gap: 12, marginTop: 14 }}>
        <Text style={{ textAlign: 'center' }}>
          Gostaríamos de saber a sua opinião sobre a obra
        </Text>
        <View style={styles.reviewContainer}>
          <Text weight="bold">Conteúdo</Text>
          <View style={styles.reviewButtons}>
            <Text
              weight="bold"
              style={[
                styles.enjoyedButton,
                {
                  borderColor: themeRecommendedColor,
                  backgroundColor:
                    (enjoyedContent === true && themeRecommendedFillColor) ||
                    (enjoyedContent === false && 'transparent'),
                },
              ]}
              onPress={() => setEnjoyedContent(true)}
            >
              Gostei
            </Text>
            <Text
              weight="bold"
              style={[
                styles.enjoyedButton,
                {
                  borderColor: themeNotRecommendedColor,
                  backgroundColor:
                    (enjoyedContent === false &&
                      themeNotRecommendedFillColor) ||
                    (enjoyedContent === true && 'transparent'),
                },
              ]}
              onPress={() => setEnjoyedContent(false)}
            >
              Não gostei
            </Text>
          </View>
        </View>
        <View style={styles.reviewContainer}>
          <Text weight="bold">Narração</Text>
          <View style={styles.reviewButtons}>
            <Text
              weight="bold"
              style={[
                styles.enjoyedButton,
                {
                  borderColor: themeRecommendedColor,
                  backgroundColor:
                    (enjoyedNarrator === true && themeRecommendedFillColor) ||
                    (enjoyedNarrator === false && 'transparent'),
                },
              ]}
              onPress={() => setEnjoyedNarrator(true)}
            >
              Gostei
            </Text>
            <Text
              weight="bold"
              style={[
                styles.enjoyedButton,
                {
                  borderColor: themeNotRecommendedColor,
                  backgroundColor:
                    (enjoyedNarrator === false &&
                      themeNotRecommendedFillColor) ||
                    (enjoyedNarrator === true && 'transparent'),
                },
              ]}
              onPress={() => setEnjoyedNarrator(false)}
            >
              Não gostei
            </Text>
          </View>
        </View>
        <View style={styles.reviewContainer}>
          <Text weight="bold">Geral</Text>
          <View style={styles.reviewButtons}>
            <Text
              weight="bold"
              style={[
                styles.enjoyedButton,
                {
                  borderColor: themeRecommendedColor,
                  backgroundColor:
                    (recommended === true && themeRecommendedFillColor) ||
                    (recommended === false && 'transparent'),
                },
              ]}
              onPress={() => setRecommended(true)}
            >
              Gostei
            </Text>
            <Text
              weight="bold"
              style={[
                styles.enjoyedButton,
                {
                  borderColor: themeNotRecommendedColor,
                  backgroundColor:
                    (recommended === false && themeNotRecommendedFillColor) ||
                    (recommended === true && 'transparent'),
                },
              ]}
              onPress={() => setRecommended(false)}
            >
              Não gostei
            </Text>
          </View>
        </View>
        <Text>Dê um título para o seu comentário</Text>
        <TextInput
          placeholder="O que você achou?"
          placeholderTextColor={themeTextColor}
          value={title}
          onChangeText={setTitle}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 6,
            borderColor: themeTextColor,
            color: themeTextColor,
          }}
        />
        <Text>Escreva sua avaliação</Text>
        <TextInput
          multiline={true}
          placeholder="Escreva sobre sua experiência"
          placeholderTextColor={themeTextColor}
          value={content}
          onChangeText={setContent}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 6,
            borderColor: themeTextColor,
            color: themeTextColor,
          }}
        />
        <Text
          weight="bold"
          fontSize={16}
          style={{
            textAlign: 'center',
            paddingVertical: 10,
            backgroundColor: themeCardStyle,
            borderColor: themeBorderStyle,
            borderWidth: 2,
            borderRadius: 6,
            marginBottom: 20,
          }}
          onPress={handleSubmitReview}
        >
          Enviar
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 12,
  },

  enjoyedButton: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderRadius: 6,
  },

  reviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  reviewButtons: {
    flexDirection: 'row',
    gap: 14,
  },
});
