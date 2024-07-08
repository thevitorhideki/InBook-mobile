// components/Header.js
import Text from '@/components/Text'; // Certifique-se de que o caminho para o componente Text esteja correto
import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome6 } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = ({ title, showBackButton = true, showMenuButton = true }) => {
  const themeIconStyle = useThemeColor({}, 'icon');
  const themeBackgroundStyle = useThemeColor({}, 'background');
  const navigator = useNavigation();

  return (
    <SafeAreaView
      style={[styles.header, { backgroundColor: themeBackgroundStyle }]}
    >
      {showBackButton && (
        <FontAwesome6
          name="chevron-left"
          size={24}
          color={themeIconStyle}
          onPress={navigator.goBack}
        />
      )}
      <Text style={styles.title} weight="bold" fontSize={20}>
        {title}
      </Text>
      {showMenuButton ? (
        <Link href="/">
          <FontAwesome6
            name="ellipsis-vertical"
            size={24}
            color={themeIconStyle}
          />
        </Link>
      ) : (
        <View style={{ width: 15 }} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },

  title: {
    flex: 1,
    textAlign: 'center',
  },
});

export default Header;
