import React from 'react';
import { View, Text, ScrollView,Alert } from 'react-native'
import { TextInput,Snackbar } from 'react-native-paper';
import model from './../Styles/model';
import IconButton from './../button/IconButton'
import AnimatedLoader from 'react-native-animated-loader'
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore'

const Donate = (props) => {
    const [Address, setAddress] = React.useState()
    const [Time, setTime] = React.useState()
    const [Item, setItem] = React.useState()
    const [loader,setLoader] = React.useState(false)
    const [snackbar, setSnackbar]= React.useState(false)
    const [User,setUser]=React.useState(null)
    const uid = props.route.params.uid;

    React.useEffect(()=>{
        firestore().collection('UserInformation').doc(uid).onSnapshot(doc=>{
            if(doc){
                setUser(doc.data())
            }
        })
    },[])
    return (
        <View style={{
            width: '100%', height: '100%', justifyContent: 'center',
            alignItems: 'center', backgroundColor: '#FFFF'
        }}>
            <TextInput style={model.input} placeholder="Picking Address...." label="Address"
                value={Address} onChangeText={(val) => setAddress(val)} />
            <TextInput style={model.input} placeholder="Picking Time & Date...." label="Time & Date"
                value={Time} onChangeText={(val) => setTime(val)} />
            <TextInput style={model.input} placeholder="Picking Items...." label="Items"
                value={Item} onChangeText={(val) => setItem(val)} />

            <IconButton style={{ marginVertical: 30 }} label='Picking Request' icon='send' onPress={() => {
                if(!Address || !Time || !Item){
                    Alert.alert('Error','Please fill all inputs')
                    return;
                }
                setLoader(true)
                const uid =uuid.v4();
                firestore().collection('Donate').doc(uid).set({
                    NewDate: new Date(),
                    Type: 'donate',
                    User:User,
                    Read: false,
                    Message: User.Name+' wants send a packet items serially '
                    +Item+' at '+Time+' from '+Address,
                    Id:uid
                }).then(() => {
                    setLoader(false)
                   // setSnackbar(true)
                    setAddress('')
                    setTime('')
                    setItem('')
                   Alert.alert('Success','Successfully send the request')
                }).catch(err=>{
                    Alert.alert(err.code,err.message)
                })
            }} />
            <Snackbar visible={snackbar}>Save successful</Snackbar>
            <AnimatedLoader
                visible={loader}
                overlayColor="rgba(255, 255, 255, 0.459)"
                source={require("./../Files/88967-food-delivery-service.json")}
                animationStyle={model.loader}
                speed={1}
            >
                <Text style={{ color: "black" }}>Loading...</Text>
            </AnimatedLoader>
        </View>
    );
};

export default Donate;