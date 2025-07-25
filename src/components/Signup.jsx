import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import React, {useState} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../constans/color';
import { showSuccessToast } from './CommonToast';
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from '@react-native-firebase/firestore';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigation = useNavigation();

  const [isChecked, setIsChecked] = useState(false);

  const handleSignup = async () => {
  try {
    if (!isChecked) {
      showSuccessToast('Please agree to Terms and Privacy Policy before continuing.', 'cancel', 'red');
      return;
    }

    if (password !== confirmPassword) {
      showSuccessToast('Passwords do not match.', 'cancel', 'red');
      return;
    }

    if (email && password && username) {

      const authInstance = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        authInstance,
        email,
        password
      );

      const userId = userCredential.user.uid;

      const db = getFirestore();
      await setDoc(
        doc(db, 'users', userId),
        {
          personalInformation: {
            email,
            username,
            profileImage,
            agreedToTerms: true,
            createdAt: serverTimestamp(),
          },
        },
        { merge: true }
      );

      navigation.dispatch(StackActions.replace('homeScreen'));
    } else {
      showSuccessToast('Please enter valid data.', 'cancel', 'red');
    }
  } catch (error) {
    showSuccessToast(error.message || 'Something went wrong', 'cancel', 'red');
  }
};


  const handleImagePick = () => {
    launchImageLibrary({mediaType: 'photo', includeBase64: true}, response => {
      if (response.didCancel) {
        return;
      }
      if (response.assets && response.assets[0].base64) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 25,
          color: 'white',
          marginBottom: 20,
        }}>
        Sign Up with email
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 14,
          color: colors.infoTextColor,
          marginBottom: 40,
        }}>
        Please create your account account with email and explore app.
      </Text>
      <TouchableOpacity
        onPress={handleImagePick}
        style={styles.profileImageContainer}>
        <Image
          style={styles.profileImage}
          source={
            profileImage
              ? {uri: profileImage}
              : require('../assets/profile.png')
          }
        />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} style={styles.inputIcon} />
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={colors.placeHolderTextColor}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} style={styles.inputIcon} />
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={colors.placeHolderTextColor}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} style={styles.inputIcon} />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          placeholderTextColor={colors.placeHolderTextColor}
        />
        <TouchableOpacity
          style={styles.eyeIconContainer}
          onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye-slash' : 'eye'}
            size={20}
            color={colors.iconColor}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} style={styles.inputIcon} />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={!showConfirmPassword}
          placeholderTextColor={colors.placeHolderTextColor}
        />
        <TouchableOpacity
          style={styles.eyeIconContainer}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Icon
            name={showConfirmPassword ? 'eye-slash' : 'eye'}
            size={20}
            color={colors.iconColor}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.termsAndPrivacy}>
        <CheckBox
          isChecked={isChecked}
          onClick={() => setIsChecked(!isChecked)}
          checkBoxColor="#A9A9A9"
          checkedCheckBoxColor="#6A5ACD"
          style={styles.checkboxContainer}
        />
        <Text style={styles.termsText}>
          I agree to the{' '}
          <Text
            style={styles.linkText}
            >
            Terms of Service
          </Text>{' '}
          and{' '}
          <Text
            style={styles.linkText}
            >
            Privacy Policy
          </Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.loginRedirect}>
        <Text style={styles.loginRedirectText}>Have an Account? </Text>
        <TouchableOpacity
          onPress={() => navigation.dispatch(StackActions.replace('login'))}>
          <Text style={styles.loginLink}>Log-In</Text>
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
  profileImageContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    resizeMode: 'contain',
    borderWidth: 3,
    borderColor: '#ddd',
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
    height: 50,
    width: '85%',
    color: colors.textInputTextColor,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 15,
    height: 50,
    justifyContent: 'center',
  },
  termsAndPrivacy: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  checkbox: {
    color: '#A9A9A9',
    checkedColor: '#6A5ACD',
  },
  termsText: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 14,
    color: colors.infoTextColor,
  },
  linkText: {
    color: colors.navigationTextColor,
    textDecorationLine: 'underline',
  },
  signupButton: {
    backgroundColor: colors.buttonContainerColor,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    width: '100%',
    marginTop: 20,
  },
  signupButtonText: {
    color: colors.buttonContainerText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginRedirect: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  loginRedirectText: {
    fontSize: 16,
    color: colors.infoTextColor,
  },
  loginLink: {
    color: colors.navigationTextColor,
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 16,
  },
});

export default Signup;
