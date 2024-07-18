import { Button } from '@/components/button';
import { useSession } from '@/hooks/authContext';
import { userServer } from '@/server/user-server';
import { Image } from 'expo-image';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { getApps, initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { ActivityIndicator, TextInput, View } from 'react-native';

if (!getApps().length) {
  initializeApp({
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  });
}

export default function Profile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchUserData } = useSession();

  const picker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 256, height: 256 } }],
        { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG },
      );

      const uploadUrl = await uploadImage(manipulatedImage.uri);
      setImage(uploadUrl);
    }
  };

  async function uploadImage(uri: string) {
    setIsLoadingPhoto(true);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    try {
      const fileRef = ref(getStorage(), 'images/' + new Date().toISOString());
      const result = await uploadBytes(fileRef, blob as Blob);

      blob.close();

      return await getDownloadURL(result.ref);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingPhoto(false);
    }
  }

  const handleCreateProfile = async () => {
    try {
      setIsLoading(true);
      await userServer.createProfile({ firstName, lastName, avatarUrl: image });
      router.replace('/');
      fetchUserData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {image ? (
        <Image source={{ uri: image }} style={{ width: 96, height: 96, borderRadius: 96 }} />
      ) : isLoadingPhoto ? (
        <View className="h-24 w-24 items-center justify-center rounded-full bg-zinc-300">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <Image
          source={require('@/assets/user.jpg')}
          style={{ width: 96, height: 96, borderRadius: 96 }}
        />
      )}
      <Button onPress={picker} className="w-1/2">
        <Button.Title>Escolher imagem</Button.Title>
      </Button>
      <TextInput
        placeholder="Primeiro nome"
        onChangeText={setFirstName}
        className="rounded-lg placeholder:color-zinc-400 dark:color-zinc-300 dark:placeholder:color-zinc-500"
      />
      <TextInput
        placeholder="Sobrenome"
        onChangeText={setLastName}
        className="rounded-lg placeholder:color-zinc-400 dark:color-zinc-300 dark:placeholder:color-zinc-500"
      />

      <Button onPress={handleCreateProfile} isLoading={isLoading} className="w-1/2">
        <Button.Title>Criar perfil</Button.Title>
      </Button>
    </View>
  );
}
