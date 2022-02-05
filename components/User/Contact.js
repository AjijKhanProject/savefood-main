import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, useColorScheme } from 'react-native'
import Logo from './../Files/logo.png'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Contact = () => {

    const window = Dimensions.get('window');
    const isDarkMode = useColorScheme() === 'dark';

    const styles = StyleSheet.create({
        view: {
            width: window.width,
            height: window.height - 110,
            justifyContent: 'center',
            alignItems: 'center',
        },
        view2: {
            flexDirection: 'row',
            width: 200,
            marginTop: 5
        },
        image: {
            width: 150,
            height: 150,
            borderRadius: 150 / 2,
            borderWidth: 1,
            borderColor: isDarkMode ? 'white' : 'white',
            margin: 10
        },
        title: {
            fontSize: 22,
            fontWeight: 'bold',
        },
        icon: {
            marginRight: 10,
        }
    })
    return (
        <View style={styles.view}>
            <Text style={styles.title}>Contact</Text>
            <Image style={styles.image} source={Logo} />
            <View style={styles.view2}>
                <Ionicons style={styles.icon} name="md-call-outline" size={25} />
                <Text>01742824576</Text>
            </View>
            <View style={styles.view2}>
                <Ionicons style={styles.icon} name="ios-mail-open-outline" size={25} />
                <Text>ajijkhaan.project@gmail.com</Text>
            </View>
            <View style={styles.view2}>
                <Ionicons style={styles.icon} name="ios-location-outline" size={25} />
                <Text>Kazitula Sylhet</Text>
            </View>
        </View>
    );
};

export default Contact;