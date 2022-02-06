import React from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import IconButton from './../button/IconButton'
import model from './../Styles/model';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import AnimatedLoader from 'react-native-animated-loader';
import { launchImageLibrary } from 'react-native-image-picker';


const Profile = (props) => {
    const [Name, setName] = React.useState('Any')
    const [EditName, setEditName] = React.useState(false)
    const [Email, setEmail] = React.useState('Any')
    const [EditEmail, setEditEmail] = React.useState(false)
    const [Phone, setPhone] = React.useState('Any')
    const [EditPhone, setEditPhone] = React.useState(false)
    const [Address, setAddress] = React.useState('any')
    const [EditAddress, setEditAddress] = React.useState(false)
    const [loader,setLoader]=React.useState(false)
    const [text,setText]=React.useState('')
    const uid=props.route.params.uid
    const [button,setButton]=React.useState(false)
    const [Profile, setProfile] = React.useState('https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg')


    React.useEffect(()=>{
        firestore().collection('UserInformation').doc(uid).onSnapshot(doc=>{
            setName(doc.get('Name'))
            setPhone(doc.get('Phone'))
            setAddress(doc.get('Address'))
            setEmail(doc.get('Email'))
            setProfile(doc.get('Photo'))
        })
    },[])

    const SaveImage = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: .5
        }, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                //const source = { uri: response.uri };
                setLoader(true)
                const ref = storage().ref('images/' + response.assets[0].fileName);
                const filePath = ref.putFile(response.assets[0].uri);
                filePath.on('state_changed', snapshot => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setText('Upload is ' + progress + '% done');
                },error=>{
                    Alert.alert(error.code,error.message)
                    setLoader(false)
                },()=>{
                    filePath.snapshot.ref.getDownloadURL().then(url=>{
                        setProfile(url)
                        firestore().collection('UserInformation').doc(uid).update({
                            Photo:url
                        }).then(()=>{
                            setLoader(false)
                        }).catch(error=>{
                            setLoader(false)
                            Alert.alert(error.code,error.message)
                        })
                    })
                })
            }
        })
    }
    return (
        <ScrollView>
            <View style={[model.view2]}>
                <View>
                    <Image style={model.profile} source={{ uri: Profile }} />
                    <TouchableOpacity onPress={() => {
                        SaveImage()
                    }}>
                        <Icon style={model.bage} name='camera' size={25} color='#F39C12' />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput editable={EditName} style={[model.Input, {
                        fontSize: 18, fontWeight: '800',
                        borderBottomWidth: EditName ? 1 : 0
                    }]}
                        value={Name} onChangeText={(val) => {
                            setName(val)
                            setButton(false)
                            }} />
                    <Icon style={{ margin: 5 }} name='account-edit-outline' size={25} color='black' onPress={() => {
                        setEditName(!EditName)
                    }} />
                </View>

                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Email: </Text>
                        <TextInput editable={EditEmail} style={[model.Input, { borderBottomWidth: EditEmail ? 1 : 0 }]}
                            value={Email} onChangeText={(val) => {
                                setEmail(val)
                                setButton(false)
                                }} />
                        <Icon style={{ margin: 5 }} name='account-edit-outline' size={25} color='black' onPress={() => {
                            setEditEmail(!EditEmail)
                        }} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Phone: </Text>
                        <TextInput editable={EditPhone} style={[model.Input, { borderBottomWidth: EditPhone ? 1 : 0 }]}
                            value={Phone} onChangeText={(val) => {
                                setPhone(val)
                                setButton(false)
                                }} />
                        <Icon style={{ marginLeft: 5 }} name='account-edit-outline' size={25} color='black' onPress={() => {
                            setEditPhone(!EditPhone)
                        }} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Address: </Text>
                        <TextInput editable={EditAddress} style={[model.Input, { borderBottomWidth: EditAddress ? 1 : 0 }]}
                            value={Address} onChangeText={(val) => {
                                setAddress(val)
                                setButton(false)
                                }} />
                        <Icon style={{ marginLeft: 5 }} name='account-edit-outline' size={25} color='black' onPress={() => {
                            setEditAddress(!EditAddress)
                        }} />
                    </View>
                </View>
                <IconButton disabled={button} label='SAVE' icon='content-save' onPress={() => {
                    if (!Name || !Address || !Phone || !Email) {
                        Alert.alert('Error', 'Please fill all fields')
                        return;
                    }
                    setEditName(false)
                    setEditPhone(false)
                    setEditEmail(false)
                    setEditAddress(false)
                    setText('Saving....')
                    setLoader(true)
                    firestore().collection('UserInformation').doc(uid).update({
                        Name: Name,
                        Email: Email,
                        Phone: Phone,
                        Address: Address,
                    }).then(()=>{
                        setButton(true)
                        setLoader(false)
                    }).catch(error=>{
                        Alert.alert(error.code,error.message)
                        setLoader(false)
                    })
                }} />
                <IconButton label="LOG OUT" icon="logout" onPress={() => {
                    auth()
                        .signOut()
                        .then(() => console.log('User signed out!'));
                    props.navigation.navigate('LogIn')
                }} />
            </View>
            <AnimatedLoader
                visible={loader}
                overlayColor="rgba(255, 255, 255, 0.459)"
                source={require("../Files/88967-food-delivery-service.json")}
                animationStyle={model.loader}
                speed={1}
            >
                <Text style={{ color: "black" }}>{text}</Text>
            </AnimatedLoader>
        </ScrollView>
    );
};

export default Profile;