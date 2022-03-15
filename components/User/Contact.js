import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from './../Files/logo.png';

const Contact = () => {
  const window = Dimensions.get('window');
  const isDarkMode = useColorScheme() === 'dark';

  const styles = StyleSheet.create({
    view: {
      width: window.width,
      height: window.height - 200,
      justifyContent: 'center',
      alignItems: 'center',
    },
    view2: {
      flexDirection: 'row',
      width: 200,
      marginTop: 5,
      alignContent: 'center',
    },
    image: {
      width: 350,
      height: 350,
      borderRadius: 150 / 2,
      borderWidth: 1,
      borderColor: isDarkMode ? 'white' : 'white',
      margin: 10,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    icon: {color: '#FB6127', marginRight: 15},
    textSize: {
      fontSize: 16,
    },
  });
  return (
    <View style={styles.view}>
      <Image style={styles.image} source={Logo} />
      <View style={styles.view2}>
        <Ionicons style={styles.icon} name="call-sharp" size={36} />
        <Text style={styles.textSize}>+880 1742824576</Text>
      </View>
      <View style={styles.view2}>
        <Ionicons style={styles.icon} name="mail-sharp" size={35} />
        <Text style={styles.textSize}>ajijkhaan.project@gmail.com</Text>
      </View>
      <View style={styles.view2}>
        <Ionicons style={styles.icon} name="ios-location" size={35} />
        <Text style={styles.textSize}>
          House: 33, Block: C, Loharpara, Sylhet, Bangladesh, 3100
        </Text>
      </View>
    </View>
  );
};

export default Contact;
