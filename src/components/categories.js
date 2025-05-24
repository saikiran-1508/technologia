// components/Categories.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { CachedImage } from '../helpers/image';

export default function Categories({ categories, activeCategory, handleChangeCategory }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 16 }}>
      {categories.map((category, index) => {
        const isActive = category.strCategory === activeCategory;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleChangeCategory(category.strCategory)}
            style={{
              alignItems: 'center',
              marginRight: 16,
              padding: 6,
              backgroundColor: isActive ? '#facc15' : 'transparent',
              borderRadius: 12,
            }}
          >
            <CachedImage
              uri={category.strCategoryThumb}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#eee',
              }}
            />
            <Text style={{ fontWeight: isActive ? 'bold' : 'normal' }}>
              {category.strCategory}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
