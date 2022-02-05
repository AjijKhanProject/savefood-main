import React from 'react';
import { Alert, FlatList, StyleSheet, Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Color from './Styles/Color'
import Cart from './cart/Cart';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign'
import AnimatedLoader from "react-native-animated-loader";
import model from './Styles/model'
import SplashScreen from 'react-native-splash-screen'

const Post = (props) => {
    const window = Dimensions.get('window');
    const navigation = props.navigation;
    const [data, setData] = React.useState([])
    const [User, setUser] = React.useState(null);


   /* auth().onAuthStateChanged((user) => {
        if(user){
          setUser(user);
          navigation.navigate('Home',{email:user.email,uid:user.uid})
        }
      })*/
      SplashScreen.hide();
    React.useEffect(() => {
      /*  firestore().collection('Post').orderBy('NewDate', 'desc').get().then((data) => {
            if (data) {
                let arr = []
                data.forEach((item) => {
                    arr.push(item.data())
                })
                return setData(arr)
            } else {
                setData([])
            }
        })*/
    })
    const styles = StyleSheet.create({
        view: {
            marginTop: 0,
            marginBottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            width: window.width,
            height: window.height

        },
        fab: {
            position: 'absolute',
            margin: 16,
            right: 10,
            bottom: 10,
            width: 140,
            height: 40,
            backgroundColor: '#F39C12',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#FFFFFF',

        }
    })

    return (
        <SafeAreaView style={styles.view}>
           <ScrollView>
                {
                    data ? (
                        data.length > 0 ? (
                            data.map(data => (
                                <Cart key={data.Id} data={data} />
                            ))
                        ) : (
                            <Text style={{ marginTop: 100 }}>No Data Available</Text>
                        )
                    ) : (
                        <AnimatedLoader
                            visible={true}
                            overlayColor="rgba(255, 255, 255, 0.459)"
                            source={require("./Files/88967-food-delivery-service.json")}
                            animationStyle={model.loader}
                            speed={1}
                        >
                            <Text style={{ color: "black" }}>Loading...</Text>
                        </AnimatedLoader>
                    )
                }
            </ScrollView>
            <FAB style={styles.fab} icon={() => (
                <Icon name="login" color='#ffff' size={20} />)} label='Log In' onPress={() => {
                    navigation.navigate('LogIn');
                }} />
        </SafeAreaView>
    );
};

export default Post;