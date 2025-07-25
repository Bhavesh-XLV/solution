import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, FlatList } from 'react-native';
import colors from '../constans/color';
import { showSuccessToast } from './CommonToast';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from '@react-native-firebase/auth';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data.slice(0, 5));
      } catch (error) {
        console.log('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = async () => {
    try {
      const authInstance = getAuth();
      await signOut(authInstance);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'login' }],
        }),
      );

      showSuccessToast(
        'You have been successfully logged out.',
        'check-circle',
        'green',
      );
    } catch (error) {
      showSuccessToast(error.message || 'Something went wrong', 'cancel', 'red');
    }
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userRow}>
      <Image
        source={{ uri: `https://i.pravatar.cc/150?img=${item.id}` }}
        style={styles.avatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.navigationTextColor} />
      ) : (
        <>
          <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderUserItem}
            contentContainerStyle={{ paddingBottom: 20, marginTop:50 }}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
            <Text style={styles.loginButtonText}>Log Out</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.backGroundColor,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: colors.textInputBackGroundColor,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.textInputBorderColor,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textTitle,
  },
  userEmail: {
    fontSize: 14,
    color: colors.infoTextColor,
  },
  loginButton: {
    backgroundColor: colors.buttonContainerColor,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  loginButtonText: {
    color: colors.buttonContainerText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
