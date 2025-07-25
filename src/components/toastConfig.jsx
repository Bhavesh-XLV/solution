// toastConfig.ts
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';

const toastConfig = {
  successWithIcon: ({text1, props}) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => Toast.hide()}
      style={styles.container}>
      <Icon
        name={props.iconName}
        size={30}
        color={props.iconColor}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        {text1 ? <Text style={styles.title}>{text1}</Text> : null}
      </View>
    </TouchableOpacity>
  ),
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  icon: {
    resizeMode: 'contain',
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default toastConfig;
