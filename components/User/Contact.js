import React from 'react';
import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from './../Files/logo.png';

const Contact = () => {
  const window = Dimensions.get('window');
  const isDarkMode = useColorScheme() === 'dark';

  const styles = StyleSheet.create({
    all: {
      flexDirection: 'row',
      margin: 20,
    },
    iconStyle: {
      marginHorizontal: 10,
    },
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
      borderWidth: 0,
      borderColor: isDarkMode ? 'white' : 'white',
      margin: 10,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    icon: {
      color: '#FB6127',
      marginRight: 15,
    },
    textSize: {
      fontSize: 16,
    },
  });
  return (
    <>
      <View style={styles.view}>
        <Image style={styles.image} source={Logo} />

        <View style={styles.all}>
          <TouchableOpacity
            style={styles.iconStyle}
            onPress={() => {
              Linking.openURL('tel:+8801742824576');
            }}>
            <Ionicons style={styles.icon} name="call-sharp" size={36} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconStyle}
            onPress={() => {
              Linking.openURL('mailto:ajijkhaan.project@gmail.com');
            }}>
            <Ionicons style={styles.icon} name="mail-sharp" size={35} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconStyle}
            onPress={() => {
              Linking.openURL('geo: 24.903026, 91.874029');
            }}>
            <Ionicons style={styles.icon} name="ios-location" size={35} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Contact;

{
  /* <TouchableOpacity
          onPress={() => {
            Linking.openURL('tel:+8801742824576');
          }}>
          <View style={styles.view2}>
            <Ionicons style={styles.icon} name="call-sharp" size={36} />
            <Text style={styles.textSize}>+8801742824576</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('mailto:ajijkhaan.project@gmail.com')}>
          <View style={styles.view2}>
            <Ionicons style={styles.icon} name="mail-sharp" size={35} />
            <Text style={styles.textSize}>ajijkhaan.project@gmail.com</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL('geo: 24.903026, 91.874029')}>
          <View style={styles.view2}>
            <Ionicons style={styles.icon} name="ios-location" size={35} />
            <Text style={styles.textSize}>
              House: 33, Block: C, Loharpara, Sylhet, Bangladesh, 3100
            </Text>
          </View>
        </TouchableOpacity> */
}
