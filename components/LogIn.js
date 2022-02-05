import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity,Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import DropShadow from 'react-native-drop-shadow'
import model from './Styles/model';
import IconButton from './button/IconButton';
import AnimatedLoader from 'react-native-animated-loader'
import auth from '@react-native-firebase/auth'

const LogIn = (props) => {
    const [Email, setEmail] = React.useState();
    const [Password, setPassword] = React.useState();
    const navigation = props.navigation;
    const [loader,setLoader] = React.useState(false);

    const window = Dimensions.get('window');
    return (
        <DropShadow style={model.shadow}>
            <View style={model.view}>
                <TextInput style={model.input} placeholder="E-mail................"
                    value={Email} onChangeText={(val) => setEmail(val)}
                    mode="flat" />
                <TextInput style={model.input} placeholder="Password................"
                    value={Password} onChangeText={(val) => setPassword(val)}
                    mode="flat" secureTextEntry />

                <IconButton style={{
                    marginVertical:30,
                }} label='Next' icon='skip-next' onPress={() =>{
                   // navigation.navigate('Home')
                    if(!Email || !Password){
                        Alert.alert('Wrong','Please fill all inputs')
                        return
                    }
                    setLoader(true)
                    auth().signInWithEmailAndPassword(Email, Password).then((userCredential) => {
                        //Alert.alert('Successful','Sign In Successfully')
                        setLoader(false)
                        //console.log(userCredential)
                        const user=userCredential.user;
                        navigation.navigate('Home',{email:user.email,uid:user.uid})
                       // auth().onAuthStateChanged(user => {
                            
                       // })
                    }).catch(err=> {
                        Alert.alert('Error',err.message)
                        setLoader(false)
                    })
                }}/>

                <TouchableOpacity onPress={() => {
                    navigation.navigate('SignUp');
                }}>
                    <Text style={{ fontSize: 22,marginVertical:10 }}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Forget');
                }}>
                    <Text style={{ fontSize: 15,marginVertical:5 }}>Forget Password?</Text>
                </TouchableOpacity>
            </View>
            <AnimatedLoader
                visible={loader}
                overlayColor="rgba(255, 255, 255, 0.459)"
                source={require("./Files/88967-food-delivery-service.json")}
                animationStyle={model.loader}
                speed={1}
            >
                <Text style={{ color: "black" }}>Loading...</Text>
            </AnimatedLoader>
        </DropShadow>
    );
};

export default LogIn;