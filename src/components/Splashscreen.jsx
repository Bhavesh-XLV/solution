import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { StackActions, useNavigation } from '@react-navigation/native';
import colors from '../constans/color';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const authInstance = getAuth();

      const unsubscribe = onAuthStateChanged(authInstance, user => {
        if (user) {
          // Redirect to HomeScreen after login (change from 'signup' to your actual home route)
          navigation.dispatch(StackActions.replace('homeScreen'));
        } else {
          navigation.dispatch(StackActions.replace('login'));
        }
      });

      // Cleanup Firebase listener when component unmounts
      return () => unsubscribe();
    }, 2000);

    // Clear timer if SplashScreen unmounts before 2 seconds
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splash_screen.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backGroundColor,
  },
  logo: {
    width: 300,
    height: 300,
    borderRadius:25
  }
});

export default SplashScreen;
