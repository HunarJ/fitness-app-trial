import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';

import excData from '../../exercise_data.json';
import { FlashList } from '@shopify/flash-list';

const excImage = require('../../assets/Images/exercise1.jpg');

const ExcerciseItem = () => {


    const renderWorkoutItem = ({item}) => {
        <TouchableOpacity>
            <ImageBackground
            source={excImage}
            className="h-44 w-40 rounded-2xl overflow-hidden my-2"
            >
                <View>
                    <Text>{item.category}</Text>
                    <Text>{item.title}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    }


  const renderRow = ({ item, index }) => {
    if (index % 2 === 0) {
      const nextItem = excData[index + 1];
      return (
        <View>
            {renderWorkoutItem({item})}{nextItem && renderWorkoutItem({item: nextItem})}
        </View>
      )
    }
  };

  return (
    <View>
      <FlashList
        data={excData}
        renderItem={renderRow}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={40}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ExcerciseItem;
