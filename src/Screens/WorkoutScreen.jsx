import React from 'react';
import { View } from 'react-native';
import Welcome from '../Components/Welcome';
import { SafeAreaView } from 'react-native-safe-area-context';
import WorkoutOTD from '../Components/WorkoutOTD';
import Separator from '../Components/Separator';
import Category from '../Components/Category';
import Excercise from '../Components/Excercise';

const WorkoutScreen = () => {
  return (
    <SafeAreaView className="mx-[1%] ">
      <Welcome />
      <WorkoutOTD />
      <Separator />
      <Category />
      <Separator />
      <Excercise />
    </SafeAreaView>
  );
};

export default WorkoutScreen;
