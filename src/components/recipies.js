// components/Recipes.js
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { CachedImage } from '../helpers/image';

export default function Recipes({ meals }) {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12 }}>
        Recipes
      </Text>

      {meals.length === 0 ? (
        <Text>No recipes to show.</Text>
      ) : (
        <MasonryList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          renderItem={({ item, index }) => (
            <RecipeCard item={item} index={index} />
          )}
        />
      )}
    </View>
  );
}

function RecipeCard({ item, index }) {
  const shortName =
    item.strMeal.length > 20
      ? item.strMeal.slice(0, 20) + '...'
      : item.strMeal;

  return (
    <Pressable style={{ padding: 6 }}>
      <CachedImage
        uri={item.strMealThumb}
        style={{
          width: '100%',
          height: index % 3 === 0 ? 140 : 200,
          borderRadius: 20,
          backgroundColor: '#eee',
        }}
      />
      <Text style={{ marginTop: 6, fontWeight: '600', color: '#444' }}>
        {shortName}
      </Text>
    </Pressable>
  );
}
