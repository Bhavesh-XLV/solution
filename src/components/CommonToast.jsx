import Toast from 'react-native-toast-message';

export const showSuccessToast = (
  text,
  iconName,
  iconColor,
) => {
  Toast.show({
    type: 'successWithIcon',
    text1: text,
    position: 'bottom',
    props: {
      iconName,
      iconColor,
    },
  });
};
