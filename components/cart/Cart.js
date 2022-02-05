import React from 'react';
import { View, Text, Image, StyleSheet,useColorScheme,Dimensions } from 'react-native';
import DropShadow from "react-native-drop-shadow";
import Volunteer from './../User/Volunteer';
const Cart = (props) => {
    const [Name, setName] = React.useState(props.data.name);
    const [Address, setAddress] = React.useState(props.address);
    const [date, setDate] = React.useState(props.data.NewDate.toDate());
    const [Month, setMonth] = React.useState("");
    const [DonateBy, setDonateBy] = React.useState('Sagor Alamat');
    const data=props.data

    const window=Dimensions.get('window');
    React.useState(() => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var dates = date.getDate();
        var m = date.getMonth();
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        setMonth(dates + " " + months[m]);
        if (hours > 12) {
            hours = hours - 12;
            setDate(hours + ":" + minutes + " " + "PM");
        } else {
            setDate(hours + ":" + minutes + " " + "AM");
        }
    })
    const styles = StyleSheet.create({
        container:{
            width:window.width-25,
            backgroundColor:'#FFFF',
            borderRadius:20
        },
        header: {
            flexDirection: 'row',
            borderRadius: 20,
    
        },
        profile: {
            width: 50,
            height: 50,
            borderRadius: 25,
            margin: 10,
        },
        box1: {
            flex: 2,
            justifyContent: 'center'
        },
        box2: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        headText: {
            fontWeight: 'bold',
            fontSize:17,
        },
        text: {
            fontSize:15
        },
        image: {
            width:window.width-30,
            marginLeft:2.5,
            height:window.width/2,
            borderRadius:10
        }
    
    })
    return (
        <DropShadow style={{
            shadowColor: '#000',
            shadowOffset: {
                width: 2,
                height: 2
            },
            shadowOpacity: .4,
            borderRadius: 5,
            margin:5
        }}>
            <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.profile}
                    source={{ uri: data.user? data.user.Photo:'https://previews.123rf.com/images/urfandadashov/urfandadashov1808/urfandadashov180824282/109059479-loading-vector-icon-isolated-on-transparent-background-loading-logo-concept.jpg' }}
                />
                <View style={styles.box1}>
                    <Text style={styles.headText}>{data.user?data.user.Name:'.........'}</Text>
                    <Text style={styles.text}>{data.user?data.user.Address:'....'}</Text>
                </View>
                <View style={styles.box2}>
                    <Text style={styles.text}>{date}</Text>
                    <Text style={styles.text}>{Month}</Text>
                </View>
            </View>
            <View>
                <Image style={styles.image} source={{ uri: props.data.Photo? props.data.Photo:'https://previews.123rf.com/images/urfandadashov/urfandadashov1808/urfandadashov180824282/109059479-loading-vector-icon-isolated-on-transparent-background-loading-logo-concept.jpg'}}/>
            </View>
            <View style={styles.header}>
                <Image
                    style={styles.profile}
                    source={{ uri: data.doner? data.doner.Photo: 'https://previews.123rf.com/images/urfandadashov/urfandadashov1808/urfandadashov180824282/109059479-loading-vector-icon-isolated-on-transparent-background-loading-logo-concept.jpg' }}
                />
                <View style={styles.box1}>
                    <Text style={styles.headText}>Donate By</Text>
                    <Text style={styles.text}>{data.doner?data.doner.Name:'..'}</Text>
                </View>
            </View>
            </View>
        </DropShadow>
    );
};

export default Cart;