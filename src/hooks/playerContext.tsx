import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import { createContext, useContext, useEffect, useState } from 'react';

type PlayerContextProviderProps = {
  children: React.ReactNode;
};

export enum PlaybackSpeed {
  Slow = 0.5,
  Normal = 1,
  Fast = 2,
}

const PlayerContext = createContext<{
  speed: number;
  isPlaying: boolean;
  isLoadingAudio: boolean;
  playbackStatus: any;
  sound: Sound;
  positionMs: number;
  setPositionMs: (position: number) => void;
  setPlaybackSpeed: (speed: number) => void;
  setAudioBookUrl: (url: string) => void;
  playAudio: () => void;
  pauseAudio: () => void;
  resumeAudio: () => void;
}>({
  speed: PlaybackSpeed.Normal,
  isPlaying: false,
  isLoadingAudio: false,
  playbackStatus: null,
  sound: null,
  positionMs: 0,
  setPositionMs: () => null,
  setPlaybackSpeed: () => null,
  setAudioBookUrl: () => null,
  playAudio: () => null,
  pauseAudio: () => null,
  resumeAudio: () => null,
});

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [speed, setSpeed] = useState(PlaybackSpeed.Normal);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Sound | null>(null);
  const [playbackStatus, setPlaybackStatus] = useState<any>(null);
  const [positionMs, setPositionMs] = useState(0);
  const [audioBookUrl, setAudioBookUrl] = useState('');

  function setPlaybackSpeed(speed: number) {
    setSpeed(speed);
  }

  const playAudio = async () => {
    try {
      setIsLoadingAudio(true);
      const { sound } = await Audio.Sound.createAsync({
        uri: audioBookUrl,
      });
      setSound(sound);

      await sound.playAsync();
      sound.setRateAsync(speed, true, Audio.PitchCorrectionQuality.High);
      sound.setOnPlaybackStatusUpdate((status) => setPlaybackStatus(status));

      setIsPlaying(true);
      setPositionMs(0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const resumeAudio = async () => {
    if (sound) {
      try {
        await sound.playFromPositionAsync(positionMs);
        setIsPlaying(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const pauseAudio = async () => {
    if (sound) {
      try {
        await sound.pauseAsync();
        setIsPlaying(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync().catch((error) => console.error('Error unloading sound:', error));
      }
    };
  }, [sound]);

  useEffect(() => {
    const speedAudio = async () => {
      if (sound) {
        try {
          await sound.setRateAsync(speed, true, Audio.PitchCorrectionQuality.High);
        } catch (error) {
          console.error(error);
        }
      }
    };

    speedAudio();
  }, [speed, sound]);

  useEffect(() => {
    if (isPlaying) {
      const updatePosition = async () => {
        if (playbackStatus) {
          try {
            setPositionMs(playbackStatus.positionMillis);
            if (playbackStatus.didJustFinish) {
              setIsPlaying(false);
              setPositionMs(0);
            }
          } catch (error) {
            console.error(error);
          }
        }
      };

      const interval = setInterval(updatePosition, 100);

      return () => clearInterval(interval);
    }
  }, [playbackStatus, isPlaying]);

  return (
    <PlayerContext.Provider
      value={{
        speed,
        isPlaying,
        isLoadingAudio,
        playbackStatus,
        sound,
        positionMs,
        setPositionMs,
        setPlaybackSpeed,
        setAudioBookUrl,
        playAudio,
        pauseAudio,
        resumeAudio,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
