// helpers/image.js
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CachedImage = ({ uri, style }) => {
  const [source, setSource] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const cached = await AsyncStorage.getItem(uri);
        if (cached) {
          setSource({ uri: cached });
        } else {
          const res = await fetch(uri);
          const blob = await res.blob();
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result;
            AsyncStorage.setItem(uri, base64);
            setSource({ uri: base64 });
          };
          reader.readAsDataURL(blob);
        }
      } catch {
        setSource({ uri }); // fallback
      }
    };

    loadImage();
  }, [uri]);

  return (
    <Image
      source={source ? source : require('../assets/placeholder.png')}
      style={style}
      resizeMode="cover"
    />
  );
};
