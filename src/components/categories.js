import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Animated,
} from 'react-native';
import React, { useRef } from 'react';

export default function Categories({ categories = [], activeCategory, handleChangeCategory }) {
  const scaleAnimRefs = useRef(categories.map(() => new Animated.Value(1))).current;

  const handlePress = (index, categoryName) => {
    Animated.sequence([
      Animated.timing(scaleAnimRefs[index], {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnimRefs[index], {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    handleChangeCategory(categoryName); // ✅ Correct function call
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
            <Animated.View
              style={{
                transform: [{ scale: scaleAnimRefs[index] }],
                alignItems: 'center',
                marginRight: 14,
                padding: 4,
                borderRadius: 12,
                backgroundColor: isActive ? '#fbbf24' : 'transparent',
              }}
            >
              <Image
                source={{ uri: category.strCategoryThumb }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  marginBottom: 4,
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
            </Animated.View>
          </TouchableWithoutFeedback>
        );
      })}
    </ScrollView>
  );
}
