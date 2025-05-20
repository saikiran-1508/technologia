import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Recipes({ meals }) {
  return (
    <View style={{ marginHorizontal: wp(4), gap: hp(2) }}>
      <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-600">
        Recipes
      </Text>

      {meals.length === 0 ? (
        <Text>No recipes to display.</Text>
      ) : (
        <MasonryList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => <RecipeCard item={item} index={index} />}
          // Optional: Add pagination handlers later
        />
      )}
    </View>
  );
}

const RecipeCard = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}
    >
      <Pressable
        style={{
          width: '100%',
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
      >
        <Image
          source={{ uri: item.strMealThumb }}
          resizeMode="cover"
          style={{
            width: '100%',
            height: index % 3 === 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
        />

        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
