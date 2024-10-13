import React from 'react';
import { View, Text } from 'react-native';
import ExcerciseItem from './ExcerciseItem';

const Excercise = () => {
    return (
        <View>
            <View className="flex-row items-center justify-between mx-10 mb-3">
                <Text className="text-xl font-bold">Excercise</Text>
            </View>
            <ExcerciseItem />
        </View>
    );
}

export default Excercise;
