import React from "react";
import { ScrollView, View } from "react-native";
import Welcome from "../Components/Welcome";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutOTD from "../Components/WorkoutOTD";
import Separator from "../Components/Separator";
import Category from "../Components/Category";
import Excercise from "../Components/Excercise";

const WorkoutScreen = () => {
  return (
    <SafeAreaView className="mx-[1%] ">
      <Welcome />
      <ScrollView>
        <WorkoutOTD />
        <Separator />
        <Category />
        <Separator />
        <Excercise />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutScreen;
