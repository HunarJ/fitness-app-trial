import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Welcome = () => {
  const [loaded, error] = useFonts({
    'Kameron-Bold': require('../../assets/fonts/kameron/Kameron-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <View>
      <Text
        style={{
          fontFamily: 'Kameron-Bold',
          fontSize: 35,
          textAlign: 'center',
          color: '#92400e',
        }}
      >
        Welcome
      </Text>
    </View>
  );
};

export default Welcome;
