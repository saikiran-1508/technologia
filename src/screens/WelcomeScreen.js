import { View, Text, Image, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0)
  const ring2padding = useSharedValue(0)
  const navigation = useNavigation()

  useEffect(() => {
    ring1padding.value = 0
    ring2padding.value = 0

    const timer1 = setTimeout(() => {
      ring1padding.value = withSpring(ring1padding.value + hp(6), { damping: 10 })
    }, 100)

    const timer2 = setTimeout(() => {
      ring2padding.value = withSpring(ring2padding.value + hp(6), { damping: 10 })
    }, 300)

    const timer3 = setTimeout(() => {
      navigation.navigate('Home')
    }, 1500)

    // Cleanup all timers on unmount
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [navigation])

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar barStyle="light-content" />

      {/* logo image with rings */}
      <Animated.View className="bg-white/20 rounded-full" style={{ padding: ring2padding }}>
        <Animated.View className="bg-white/20 rounded-full" style={{ padding: ring1padding }}>
          <Image 
            source={require('../../assets/images/welcome.png')} 
            style={{ width: hp(22), height: hp(22) }}
            className="rounded-full"
          />
        </Animated.View>
      </Animated.View>

      <Text style={{ fontSize: hp(2) }} className="text-white font-bold">
        Food Recipe App
      </Text>
    </View>
  )
}
