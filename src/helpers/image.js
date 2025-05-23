// helpers/image.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import Animated from 'react-native-reanimated';

export const CachedImage = (props) => {
  const [cachedSource, setCachedSource] = useState(null);
  const { uri, style } = props;

  useEffect(() => {
    let isMounted = true;

    const getCachedImage = async () => {
      try {
        const cachedImageData = await AsyncStorage.getItem(uri);
        if (cachedImageData) {
          isMounted && setCachedSource({ uri: cachedImageData });
        } else {
          const response = await fetch(uri);
          const imageBlob = await response.blob();
          const base64Data = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onload = () => resolve(reader.result);
          });
          await AsyncStorage.setItem(uri, base64Data);
          isMounted && setCachedSource({ uri: base64Data });
        }
      } catch (error) {
        console.error('Error caching image:', error);
        isMounted && setCachedSource({ uri }); // fallback to original URI
      }
    };

    getCachedImage();

    return () => {
      isMounted = false;
    };
  }, [uri]);

  return cachedSource ? (
    <Animated.Image source={cachedSource} style={style} {...props} />
  ) : (
    <Image
      source={require('../assets/placeholder.png')} // Add a local placeholder
      style={style}
    />
  );
};
