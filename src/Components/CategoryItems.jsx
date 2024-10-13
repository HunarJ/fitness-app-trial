import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const beginner = require('../../assets/Images/beginner.jpg');
const balance = require('../../assets/Images/balance.jpg');
const gentle = require('../../assets/Images/gentle.jpg');
const intense = require('../../assets/Images/intense.jpg');
const moderate = require('../../assets/Images/moderate.jpg');
const strength = require('../../assets/Images/strength.jpg');
const toning = require('../../assets/Images/toning.jpg');

const workouData = [
  { id: 1, imageSource: balance, numberOfExercices: 9, title: 'balance' },
  { id: 2, imageSource: beginner, numberOfExercices: 7, title: 'beginner' },
  { id: 3, imageSource: gentle, numberOfExercices: 5, title: 'gentle' },
  { id: 4, imageSource: intense, numberOfExercices: 8, title: 'intense' },
  { id: 5, imageSource: moderate, numberOfExercices: 23, title: 'moderate' },
  { id: 6, imageSource: strength, numberOfExercices: 11, title: 'strength' },
  { id: 7, imageSource: toning, numberOfExercices: 10, title: 'toning' },
];

const CategoryItems = () => {
  const renderWorkoutItem = ({ item }) => (
    <TouchableOpacity>
      <ImageBackground
        source={item.imageSource}
        className="h-36 w-40 rounded-2xl overflow-hidden mx-2 bg-neutral-900"
      >
        <View className="flex-1 justify-between m-3">
          <View className="flex-row items-center space-x-1">
            <FontAwesome5 name="dumbbell" size={15} color="white" />
            <Text className="text-white font-bold tracking-widest">
              {item.numberOfExercices}
            </Text>
          </View>
          <Text className="text-white font-medium tracking-widest uppercase">
            {item.title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={workouData}
        renderItem={renderWorkoutItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoryItems;
