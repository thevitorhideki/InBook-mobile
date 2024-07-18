import { ToolBarPlayer } from '@/components/books/toolBarPlayer';
import { Header } from '@/components/navigation/Header';
import { Text } from '@/components/text';
import { usePlayer } from '@/hooks/playerContext';
import { BookDetails, booksServer } from '@/server/books-server';
import { timeToString } from '@/utils/timeToString';
import Slider from '@react-native-community/slider';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function AudioBookPlayer() {
  const [bookDetails, setBookDetails] = useState({} as BookDetails);
  const [isLoadingBookDetails, setIsLoadingBookDetails] = useState(true);
  const { playbackStatus, sound, positionMs, setPositionMs, setAudioBookUrl } = usePlayer();
  const { bookId } = useLocalSearchParams<{ bookId: string }>();

  const handleSliderValueChange = async (value) => {
    try {
      const position = value * playbackStatus.durationMillis;
      await sound.setPositionAsync(position);
      setPositionMs(position);
    } catch (error) {
      console.error(error);
    }
  };

  const getProgress = () => {
    if (
      playbackStatus &&
      playbackStatus.positionMillis != null &&
      playbackStatus.durationMillis != null &&
      playbackStatus.positionMillis !== playbackStatus.durationMillis
    ) {
      return playbackStatus.positionMillis / playbackStatus.durationMillis;
    }
    return 0;
  };

  useEffect(() => {
    const getBookDetails = async () => {
      try {
        setIsLoadingBookDetails(true);

        if (!bookId) {
          return router.push('/404');
        }

        const bookDetails = await booksServer.getById(bookId);
        setBookDetails(bookDetails);
        setAudioBookUrl(bookDetails.audiobookFileUrl);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingBookDetails(false);
      }
    };

    getBookDetails();
  }, []);

  if (isLoadingBookDetails) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <View className="flex-1">
        <Header />
        <View className="items-center gap-2">
          <Image
            source={{ uri: bookDetails.coverImageUrl }}
            style={{ height: 208, width: 208, alignSelf: 'center', borderRadius: 16 }}
          />
          <Text className="text-center font-semibold text-2xl">{bookDetails.title}</Text>
          <Text className="font-light text-base">{bookDetails.author.name}</Text>
        </View>
        <View className="mx-auto w-11/12">
          <View className="flex-row justify-between">
            <Text>{timeToString(positionMs)}</Text>
            <Text>{timeToString(bookDetails.duration)}</Text>
          </View>
          <Slider
            className="w-full"
            value={getProgress()}
            onValueChange={handleSliderValueChange}
            minimumTrackTintColor="#f97316"
            maximumTrackTintColor="#fdba74"
            thumbTintColor="#f97316"
          />
        </View>
      </View>
      <ToolBarPlayer bookId={parseInt(bookId)} />
    </>
  );
}
