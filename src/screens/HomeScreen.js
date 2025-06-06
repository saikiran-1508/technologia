import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import axios from 'axios';
import Categories from '../components/categories';
import Recipies from '../components/recipies';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getRecipes(activeCategory);
  }, [activeCategory]);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
  };

  const getCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/categories.php'
      );
      if (response?.data?.categories?.length > 0) {
        setCategories(response.data.categories);
      } else {
        setError('No categories found');
      }
    } catch (err) {
      console.log('API error: ', err.message);
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const getRecipes = async (category = 'Beef') => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response?.data?.meals?.length > 0) {
        setMeals(response.data.meals);
      } else {
        setMeals([]);
        setError('No recipes found');
      }
    } catch (err) {
      console.log('API error: ', err.message);
      setError('Failed to fetch recipes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Avatar and Bell icon */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/avatar.png')}
            style={styles.avatar}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* Greetings */}
        <View style={styles.greetingsContainer}>
          <Text style={styles.subText}>Hello, Noman!</Text>
          <Text style={styles.mainText}>Make your own food,</Text>
          <Text style={styles.mainText}>
            stay at <Text style={styles.highlight}>home</Text>
          </Text>
        </View>

        {/* Search bar */}
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor="gray"
            style={styles.searchInput}
          />
          <View style={styles.searchIconContainer}>
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        {/* Categories and Recipes */}
        <View style={styles.categoriesContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#fbbf24" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <>
              <Categories
                categories={categories}
                activeCategory={activeCategory}
                handleChangeCategory={handleChangeCategory}
              />
              <Recipies meals={meals} />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 50,
    paddingTop: hp(5),
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  avatar: {
    height: hp(5),
    width: hp(5),
    borderRadius: 50,
  },
  greetingsContainer: {
    marginHorizontal: wp(4),
    marginBottom: hp(1),
  },
  subText: {
    fontSize: hp(1.7),
    color: '#525252',
  },
  mainText: {
    fontSize: hp(3.8),
    fontWeight: '600',
    color: '#525252',
  },
  highlight: {
    color: '#fbbf24',
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 50,
    padding: 6,
  },
  searchInput: {
    fontSize: hp(1.7),
    flex: 1,
    paddingLeft: 12,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  searchIconContainer: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 12,
  },
  categoriesContainer: {
    marginTop: hp(2),
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: hp(2),
    marginTop: 20,
  },
});
