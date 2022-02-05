import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import model from './../Styles/model';
import VolunteerCart from './../cart/VolunteerCart'
import Icon from 'react-native-vector-icons/AntDesign';
import DropShadow from 'react-native-drop-shadow'
import IconButton from './../button/IconButton'
import AnimatedLoader from 'react-native-animated-loader'
import uuid from 'react-native-uuid'
import { TextInput } from 'react-native-paper'

const Volunteer = (props) => {
    const params = props.route.params;
    const [Admin, setAdmin] = React.useState('')
    const [Notifications, setNotifications] = React.useState(null)
    const [Profile, setProfile] = React.useState(null)
    const [visible, setVisible] = React.useState(false)
    const [date, setDate] = React.useState(new Date())
    React.useEffect(() => {
        /*firestore().collection('Donate').orderBy('NewDate', 'desc').onSnapshot(data => {
            if (data) {
                let arr = [];
                data.forEach(doc => {
                    arr.push(doc.data())
                })
                setNotifications(arr)
            } else {
                setNotifications([])
            }
        })*/
    })

    const SaveImage = (Name) => {
        if (!Name) {
            Alert.alert('Error', 'Add donar name first.')
            return
        }

        launchImageLibrary({
            mediaType: 'photo',
            quality: .5
        }, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                setVisible(false);
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                setVisible(false);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                setVisible(false);
            } else {
                //const source = { uri: response.uri };
                setVisible(true)
                const id = uuid.v1();
                setProfile(response.assets[0].uri)
                const ref = storage().ref('posts/' + response.assets[0].fileName);
                ref.putFile(response.assets[0].uri).then(() => {
                    ref.getDownloadURL().then(url => {
                        firestore().collection('Post').doc(id).set({
                            Image: url,
                            Volunteer: params.uid,
                            Donar: Name,
                            NewDate: new Date(),
                            Id: id
                        }).then(() => {
                            setVisible(false);
                            Alert.alert('Success', 'Your post has been successfully submitted')
                        })

                    })
                })
            }
        })
    }
    const Reject = (props) => {
        setVisible(true)
        //setRead(true);
        const id = uuid.v4();
        const ref2 = firestore().collection('Notification').doc(id)
        const ref3 = firestore().collection('Donate').doc(props.Id);
        if (props && props.Type) {
            const batch = firestore().batch();
            batch.set(ref2, {
                Uid: props.Uid,
                Message: 'Your donation request is rejected by ' + params.name,
                NewDate: date,
                Id: params.uid
            })
            batch.update(ref3, {
                Read: true,
            })
            batch.commit().then(() => {
                setVisible(false)
            }).catch(err => {
                setVisible(false)
            })
        }
    }
    const Accept = (props) => {
        setVisible(true)
        const id = uuid.v4();
        const increment = app.firestore.FieldValue.increment(1);
        const ref1 = firestore().collection('UserInformation').doc(props.Uid)
        const ref2 = firestore().collection('Notification').doc(id)
        const ref3 = firestore().collection('Donate').doc(props.Id);
        if (props && props.Type === 'donate') {
            const batch = firestore().batch();
            batch.update(ref1, {
                Point: increment
            })
            batch.set(ref2, {
                Uid: p.Uid,
                Message: 'Your donation request is accepted by ' + params.name,
                NewDate:date,
                Id: params.uid
            })
            batch.update(ref3, {
                Read: true,
            })
            batch.commit().then(() => {
                setVisible(false)
            }).catch(err => {
                setVisible(false)
            })
        } else if (props && props.Type === 'request') {
            const batch = firestore().batch();
            batch.update(ref1, {
                Volunteer: true,
            })
            batch.set(ref2, {
                Uid: props.Uid,
                Message: 'Your donation request is rejected by ' + params.name,
                NewDate: date,
                Id: params.uid
            })
            batch.update(ref3, {
                Read: true,
            })
            batch.commit().then(() =>{
                setVisible(false)
            }).catch(err =>{
                setVisible(false)
            })
        }
    }
    if (!Admin) {
        return (
            <View style={model.view}>
                <IconButton label="Request for Volunteer" icon='bike-fast' onPress={() => async () => {
                    const id = uuid.v4();
                    await firestore().collection('Donate').doc(id).set({
                        Uid: params.uid,
                        Message: params.name + ' is requested for volunteering.',
                        Read: false,
                        NewDate: new Date(),
                        Type: 'request',
                        Id: id
                    })
                    Alert.alert('Success', 'Your request is now pending. Wait for response.')
                }} />
            </View>
        );
    } else {
        return (
            <ScrollView>
                <AddPost onPress={(Name) => SaveImage(Name)} />
                {
                    Notifications ? (
                        Notifications.length > 0 ? (
                            Notifications.map((doc) => (
                                <VolunteerCart key={doc.NewDate} navigation={props.navigation} data={doc}
                                    uid={params.uid} name={params.name} date={date} reject={(val)=>Reject(val)} 
                                    accept={(val)=>Accept(val)}
                                />
                            ))
                        ) : (
                            <Text style={{ margin: 10, textAlign: 'center' }}>Request Box Empty</Text>
                        )
                    ) : (
                        <AnimatedLoader
                            visible={true}
                            overlayColor="rgba(255, 255, 255, 0.459)"
                            source={require("./../Files/88967-food-delivery-service.json")}
                            animationStyle={model.loader}
                            speed={1}
                        >
                            <Text style={{ color: "black" }}>Loading...</Text>
                        </AnimatedLoader>
                    )
                }
                <AnimatedLoader
                    visible={visible}
                    overlayColor="rgba(255, 255, 255, 0.459)"
                    source={require("./../Files/88967-food-delivery-service.json")}
                    animationStyle={model.loader}
                    speed={1}
                >
                    <Text style={{ color: "black" }}>Uploading your post.....</Text>
                </AnimatedLoader>
            </ScrollView>
        )
    }
};

export default Volunteer;
const AddPost = (props) => {
    const [Name, setName] = React.useState(null)
    return (
        <DropShadow style={model.shadow}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 5,
                margin: 5,
            }}>
                <TextInput style={model.input} label='Donar Name' placeholder="Donar Name..."
                    value={Name} onChangeText={(val) => setName(val)} />
                <TouchableOpacity style={{
                    flexDirection: 'row', margin: 10, borderRadius: 10,
                    backgroundColor: '#FDEBD0', padding: 5, paddingHorizontal: 15, justifyContent: 'center'
                    , alignItems: 'center'
                }} onPress={() => props.onPress(Name)}>
                    <Icon style={{
                        marginHorizontal: 10
                    }} name="camera" size={25} color="#000" />
                    <Text>Add Post</Text>
                </TouchableOpacity>

            </View>
        </DropShadow>
    )
}