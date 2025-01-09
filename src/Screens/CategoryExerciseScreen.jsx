import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
import { Audio } from "expo-av";
import BackButton from "../Components/BackButton";
import ExerciseData from "../../exercise_data.json";
import AntDesign from "@expo/vector-icons/AntDesign";
const countDownAudio = require("../../assets/audio/countdownaudio.mp3");

const CategoryExerciseScreen = ({ route }) => {
  const { intensity } = route.params;
  const initialTime = 5;
  const minimumTime = 5;

  const [gifUrl, setGifUrl] = useState(null);
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isfirstTime, setIsFirstTime] = useState(true);
  const [countDownSound, setCountDownSound] = useState();
  const [exercises, setExercises] = useState([]);
  const [categoryExercises, setCategoryExercises] = useState([]);
  const [exerciseIndex, setExerciseIndex] = useState(0);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchExercisesByIntensity = async (intensity) => {
    const intensityTransformed = capitalizeFirstLetter(intensity);

    const folderPath = `${intensityTransformed}Exercises`;
    const storageRef = ref(storage, folderPath);

    try {
      const matchingExercises = [];
      listAll(storageRef).then((res) => {
        res.items.forEach((item) => {
          const fileName = item.name.split("/").pop();
          const matchingExercise = ExerciseData.find(
            (exercise) => exercise.gif_url === fileName
          );
          if (matchingExercise) {
            matchingExercises.push(matchingExercise);
          }
        });
        setExercises(matchingExercises);
      });
    } catch (error) {}
  };

  useEffect(() => {
    fetchExercisesByIntensity(intensity);
  }, []);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(countDownAudio);
    setCountDownSound(sound);

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setIsAudioPlaying(false);
      }
    });
    await sound.playAsync();
    setIsAudioPlaying(true);
  }

  const fetchGifUrl = async (exercise) => {
    const intensityTransformed = capitalizeFirstLetter(intensity);
    try {
      const storageRef = ref(
        storage,
        `${intensityTransformed}Exercises/${exercise.gif_url}`
      );
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.log("error = ", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchGifsUrlsForExercises = async () => {
      const exerciseWithGifUrl = await Promise.all(
        exercises.map(async (exercise) => {
          const gifUrl = await fetchGifUrl(exercise);
          return {
            ...exercise,
            gif_url: gifUrl,
          };
        })
      );
      setCategoryExercises(exerciseWithGifUrl);
    };
    fetchGifsUrlsForExercises();
  }, [exercises]);

  useEffect(() => {
    let countDownInterval;
    if (isRunning && time > 0) {
      countDownInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        if (time === 4) {
          playSound();
        }
      }, 1000);
    } else {
      setIsRunning(false);
      clearInterval(countDownInterval);
    }

    return () => {
      clearInterval(countDownInterval);
    };
  }, [isRunning, time]);

  const handleDecrease = () => {
    if (!isRunning && time > minimumTime) {
      setTime((prevTime) => prevTime - 10);
    }
  };
  const handleIncrease = () => {
    if (!isRunning) {
      setTime((prevTime) => prevTime + 10);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFirstTime(true);
    setTime(initialTime);
    if (countDownSound && isAudioPlaying) {
      countDownSound.stopAsync();
      setIsAudioPlaying(false);
    }
  };

  const handleStart = () => {
    if (!isRunning && isfirstTime) {
      setIsFirstTime(false);
      setIsRunning(true);
    } else {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  const currentExecise = categoryExercises[exerciseIndex];

  const navigateToNextExercise = () => {
    if (exerciseIndex < categoryExercises.length - 1) {
      setExerciseIndex(exerciseIndex + 1);
    }
  };

  const navigateToPrevExercise = () => {
    if (exerciseIndex > 0) {
      setExerciseIndex(exerciseIndex - 1);
    }
  };

  return (
    <View className="flex-1">
      {currentExecise ? (
        <>
          <Image
            source={{ uri: currentExecise.gif_url }}
            className="w-full h-80"
          />
          <BackButton />
          <ScrollView>
            <View className="mt-4 mx-3">
              <Text className="text-2xl font-bold text-center mb-1">
                {currentExecise.title}
              </Text>
              <Text className="text-gray-500 mt-1">
                {currentExecise.category.split(", ").map((cat, index) => (
                  <View key={index} className="mr-2">
                    <View className="mr-2 bg-gray-300 rounded-2xl px-2 pb-1">
                      <Text>#{cat}</Text>
                    </View>
                  </View>
                ))}
              </Text>
              <View className="flex-row items-center space-x-2">
                <Text className="font-semibold  text-blue-500">Intensity:</Text>
                <Text className="text-cyan-400 italic text-base">
                  {currentExecise.intensity}
                </Text>
              </View>
              <Text className="text-xl font-semibold mt-4">Instructions:</Text>
              <View className="mt-2">
                {currentExecise.instructions.map((instruction) => (
                  <View
                    key={instruction.step}
                    className="flex-row items-center mb-2"
                  >
                    <Text className="text-base text-gray-600">
                      {instruction.step}.
                    </Text>
                    <Text className="ml-2 text-base">{instruction.text}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View className="mt-4 flex-row items-center justify-center space-x-3">
              <TouchableOpacity
                onPress={handleDecrease}
                className="items-center justify-center w-14 h-14 bg-red-500 rounded-full"
              >
                <Text className="text-white text-5xl">-</Text>
              </TouchableOpacity>
              <Text className="text-xl font-bold">{time} secs</Text>
              <TouchableOpacity
                onPress={handleIncrease}
                className="items-center justify-center w-14 h-14 bg-green-500 rounded-full"
              >
                <Text className="text-white text-3xl">+</Text>
              </TouchableOpacity>
            </View>
            <View className="mt-4 flex-row items-center justify-center mb-10 space-x-4">
              <TouchableOpacity
                onPress={navigateToPrevExercise}
                disabled={exerciseIndex === 0}
                className={` ${exerciseIndex === 0 ? "opacity-30" : ""}`}
              >
                <AntDesign name="leftcircleo" size={38} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={isRunning ? handlePause : handleStart}
                disabled={time === 0}
              >
                <Text
                  className={`text-blue-500 text-xl py-2 border rounded-lg border-blue-500 px-4 ${
                    time === 0 ? "opacity-50" : ""
                  }`}
                >
                  {isRunning ? "PAUSE" : "START"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleReset}>
                <Text className="text-gray-500 text-xl py-2 border rounded-lg border-gray-500 px-4">
                  RESET
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={navigateToNextExercise}
                disabled={exerciseIndex === categoryExercises.length - 1}
                className={` ${
                  exerciseIndex === categoryExercises.length - 1
                    ? "opacity-30"
                    : ""
                }`}
              >
                <AntDesign name="rightcircleo" size={38} color="black" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      ) : (
        <View className="items-center justify-center h-80">
          <ActivityIndicator size={"large"} color={"gray"} />
        </View>
      )}
    </View>
  );
};

export default CategoryExerciseScreen;
