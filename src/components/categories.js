// components/Categories.js
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Animated as RNAnimated,
} from 'react-native';
import React, { useRef } from 'react';
import { CachedImage } from '../helpers/image';

export default function Categories({ categories = [], activeCategory, handleChangeCategory }) {
  const scaleAnimRefs = useRef(categories.map(() => new RNAnimated.Value(1))).current;

  const handlePress = (index, categoryName) => {
    RNAnimated.sequence([
      RNAnimated.timing(scaleAnimRefs[index], {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      RNAnimated.spring(scaleAnimRefs[index], {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    handleChangeCategory(categoryName);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ paddingHorizontal: 16 }}
    >
      {categories.map((category, index) => {
        const isActive = category.strCategory === activeCategory;

        return (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => handlePress(index, category.strCategory)}
          >
            <RNAnimated.View
              style={{
                transform: [{ scale: scaleAnimRefs[index] }],
                alignItems: 'center',
                marginRight: 14,
                padding: 4,
                borderRadius: 12,
                backgroundColor: isActive ? '#fbbf24' : 'transparent',
              }}
            >
              <CachedImage
                uri={category.strCategoryThumb}
                resizeMode="cover"
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  marginBottom: 4,
                  backgroundColor: '#e5e7eb',
                }}
              />
              <Text
                style={{
                  fontWeight: isActive ? 'bold' : 'normal',
                  color: isActive ? '#fff' : '#000',
                }}
              >
                {category.strCategory}
              </Text>
            </RNAnimated.View>
          </TouchableWithoutFeedback>
        );
      })}
    </ScrollView>
  );
}
