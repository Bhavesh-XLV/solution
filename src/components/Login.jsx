import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import colors from '../constans/color';
import { showSuccessToast } from './CommonToast';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
  if (email.length !== 0 && password.length !== 0) {
    try {
      const authInstance = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        authInstance,
        email,
        password
      );

      navigation.dispatch(StackActions.replace('homeScreen'));

      showSuccessToast(
        'You have been successfully logged in.',
        'check-circle',
        'green',
      );

      console.log('User logged in:', userCredential.user.uid);
    } catch (error) {
      console.log('Login error:', error);
      showSuccessToast('Invalid email or password.', 'cancel', 'red');
    }
  } else {
    showSuccessToast(
      'Please enter your email and password.',
      'cancel',
      'red',
    );
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} style={styles.inputIcon} />
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.placeHolderTextColor}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} style={styles.inputIcon} />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.placeHolderTextColor}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.dispatch(StackActions.replace('signup'))}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.backGroundColor,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: colors.textTitle,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: colors.textInputBackGroundColor,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.textInputBorderColor,
    width: '100%',
  },
  inputIcon: {
    marginRight: 10,
    color: colors.iconColor,
  },
  input: {
    flex: 1,
    height: 50,
    color: colors.textInputTextColor,
  },
  loginButton: {
    backgroundColor: colors.buttonContainerColor,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
  },
  loginButtonText: {
    color: colors.buttonContainerText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
    color: colors.infoTextColor,
  },
  signupLink: {
    color: colors.navigationTextColor,
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 16,
  },
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: colors.navigationTextColor,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default Login;
