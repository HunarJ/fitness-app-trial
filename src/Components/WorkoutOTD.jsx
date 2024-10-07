import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const otdImage = require('../../assets/Images/workoutotd.jpg');

const WorkoutOTD = () => {
  const [loaded, error] = useFonts({
    'Lato-Bold': require('../../assets/fonts/lato/Lato-Bold.ttf'),
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
    <TouchableOpacity className="items-center justify-center">
      <View className="rounded-3xl overflow-hidden h-40 w-[80%]">
        <ImageBackground
          source={otdImage}
          className="flex-1 justify-center items-center"
          resizeMode="cover"
        >
          <View>
            <Text
              className="text-white/70 text-3xl tracking-tighter"
              style={{ fontFamily: 'Lato-Bold' }}
            >
              Workout of the Day
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutOTD;
