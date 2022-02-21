import React from 'react';
import { View, Text, Alert } from 'react-native'
import { TextInput, Button, Snackbar } from 'react-native-paper'
import DropShadow from 'react-native-drop-shadow'
import model from './Styles/model';
import IconButton from './button/IconButton';
import AnimatedLoader from 'react-native-animated-loader'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const SignUp = (props) => {
    const [Name, setName] = React.useState(null);
    const [Email, setEmail] = React.useState(null);
    const [Password, setPassword] = React.useState(null);
    const [Address, setAddress] = React.useState(null);
    const [Phone, setPhone] = React.useState(null);
    const [EmailError, setEmailError] = React.useState(false);
    const [PasswordError, setPasswordError] = React.useState(false);
    const [User, setUser] = React.useState(null)
    const [Gender, setGender] = React.useState();
    const [loader, setLoader] = React.useState(false);
    const navigation = props.navigation;

    const StoreData = (user) => {
        firestore().collection('UserInformation').doc(user.uid).set({
            Name: Name,
            Email: Email,
            Address: Address,
            Phone: Phone,
            Volunteer: false,
            Point: 0,
            Message: false,
            Photo: 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
            Id: user.uid
        }).then(() => {
            props.navigation.navigate('Home', { email: Email, uid: user.uid })
        }).catch((error) => {
            Alert.alert('Error', error.message)
        })
    }

    return (
        <DropShadow style={model.shadow}>
            <View style={model.view}>
                <TextInput style={model.input} placeholder="Name"
                    value={Name} onChangeText={(val) => setName(val)}
                    mode="flat" />
                <TextInput error={EmailError} style={model.input} placeholder="E-mail"
                    value={Email} onChangeText={(val) => {
                        setEmail(val)
                        if (((val >= 'a' && val <= 'z') || val == '.' || val == '-' || val == '_' || val == '@')) {
                            setEmailError(false)

                        } else {
                            setEmailError(true)
                        }
                    }}
                    mode="flat" />
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput style={model.input} placeholder="Phone"
                        value={Phone} onChangeText={(val) => setPhone(val)}
                        mode="flat" />
                </View>
                <TextInput style={model.input} placeholder="Address"
                    value={Address} onChangeText={(val) => setAddress(val)}
                    mode="flat" />
                <TextInput error={PasswordError} style={model.input} placeholder="Password"
                    value={Password} onChangeText={(val) => {
                        setPassword(val)
                        if (val.length < 6) {
                            setPasswordError(true)
                        } else {
                            setPasswordError(false)
                        }
                    }}
                    mode="flat" secureTextEntry />
                <IconButton onPress={() => {
                    if (!Name || !Email || !Password || !Address || !Phone) {
                        Alert.alert('!Input', 'Please fill all inputs')
                        return;
                    }
                    if (EmailError || PasswordError) {
                        Alert.alert('!Error', 'Please provide valid email address and Password')
                        return;
                    }
                    setLoader(true);
                    auth()
                        .createUserWithEmailAndPassword(Email, Password)
                        .then((userCredential) => {
                            //console.log(userCredential.user)
                            setUser(userCredential.user)
                            StoreData(userCredential.user)
                        })
                        .catch(error => {
                            if (error.code === 'auth/email-already-in-use') {
                                Alert.alert('Error', 'That email address is already in use!')
                                setLoader(false)
                            }

                            if (error.code === 'auth/invalid-email') {
                                Alert.alert('Error', 'That email address is invalid!')
                                setLoader(false)
                            }

                            Alert.alert('Error', error.message)
                            setLoader(false)
                        })

                }} style={{ marginVertical: 30 }} label='Next' icon='skip-next' />
                <Snackbar visible={User}>User account created & signed in!</Snackbar>
                <AnimatedLoader
                    visible={loader}
                    overlayColor="rgba(255, 255, 255, 0.459)"
                    source={require("./Files/88967-food-delivery-service.json")}
                    animationStyle={model.loader}
                    speed={1}
                >
                    <Text style={{ color: "black" }}>Loading...</Text>
                </AnimatedLoader>
            </View>
        </DropShadow>
    );
};

export default SignUp;