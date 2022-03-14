import app from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React from 'react';
import {
  Alert,
  DevSettings,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import {launchImageLibrary} from 'react-native-image-picker';
import {TextInput} from 'react-native-paper';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/AntDesign';
import IconButton from './../button/IconButton';
import VolunteerCart from './../cart/VolunteerCart';
import model from './../Styles/model';

const Volunteer = props => {
  const params = props.route.params;
  const [Admin, setAdmin] = React.useState('');
  const [Notifications, setNotifications] = React.useState(null);
  const [Profile, setProfile] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [User, setUser] = React.useState(null);
  const [text, setText] = React.useState('Loading...');

  //fetching information from the server
  React.useEffect(() => {
    firestore()
      .collection('UserInformation')
      .doc(params.uid)
      .onSnapshot(doc => {
        setUser(doc.data());
        setAdmin(doc.get('Volunteer'));
      });
    firestore()
      .collection('Donate')
      .orderBy('NewDate', 'desc')
      .onSnapshot(data => {
        if (data) {
          let arr = [];
          data.forEach(doc => {
            arr.push(doc.data());
          });
          setNotifications(arr);
        } else {
          setNotifications([]);
        }
      });
  }, [Admin]);

  //code for uploading post image and increment volunteer point
  const SaveImage = Name => {
    if (!Name && !User) {
      Alert.alert('Error', 'Add donar name first and login info.');
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      response => {
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
          setVisible(true);
          const id = uuid.v1();
          setProfile(response.assets[0].uri);
          const ref = storage().ref('posts/' + response.assets[0].fileName);
          ref.putFile(response.assets[0].uri).then(() => {
            ref.getDownloadURL().then(url => {
              //adding post
              firestore()
                .collection('Post')
                .doc(id)
                .set({
                  Photo: url,
                  User: User,
                  Donar: Name,
                  NewDate: new Date(),
                  Id: id,
                })
                .then(() => {
                  //increment point
                  const increment = app.firestore.FieldValue.increment(1);
                  firestore()
                    .collection('UserInformation')
                    .doc(User.Id)
                    .update({
                      Point: increment,
                    })
                    .then(() => {
                      setVisible(false);
                      Alert.alert(
                        'Success',
                        'Your post has been successfully submitted',
                      );
                    })
                    .catch(err => {
                      setVisible(false);
                      Alert.alert(err.code, err.message);
                    });
                })
                .catch(error => {
                  Alert.alert(error.code, error.message);
                  setVisible(false);
                });
            });
          });
        }
      },
    );
  };

  //call for rejected button
  const Reject = props => {
    setVisible(true);
    //setRead(true);
    const id = uuid.v4();
    //additional reference of firestore
    const ref2 = firestore().collection('Notification').doc(id);
    const ref3 = firestore().collection('Donate').doc(props.Id);
    if (props && props.Type) {
      let message = '';
      if (props.Type === 'request') {
        message = 'volunteer request';
      } else {
        message = 'donation request';
      }
      setVisible(true);
      const batch = firestore().batch();
      //batch for commit multiple function
      batch.set(ref2, {
        User: User,
        Message: 'Your ' + message + ' is rejected by ' + User.Name,
        NewDate: date,
        Id: id,
        Uid: props.User.Id,
      });
      batch.update(ref3, {
        Read: true,
      });
      batch
        .commit()
        .then(() => {
          setVisible(false);
          DevSettings.reload();
        })
        .catch(err => {
          setVisible(false);
        });
    }
  };
  const Accept = props => {
    setVisible(true);
    const id = uuid.v4();
    const ref1 = firestore().collection('UserInformation').doc(props.User.Id);
    const ref2 = firestore().collection('Notification').doc(id);
    const ref3 = firestore().collection('Donate').doc(props.Id);
    if (props && props.Type === 'donate') {
      setVisible(true);
      const batch = firestore().batch();
      batch.set(ref2, {
        User: User,
        Message: 'Your donation request is accepted by ' + User.Name,
        NewDate: date,
        Id: id,
        Uid: props.User.Id,
      });
      batch.update(ref3, {
        Read: true,
      });
      batch
        .commit()
        .then(() => {
          setVisible(false);
          DevSettings.reload();
        })
        .catch(err => {
          setVisible(false);
        });
    } else if (props && props.Type === 'request') {
      setVisible(true);
      const batch = firestore().batch();
      batch.update(ref1, {
        Volunteer: true,
      });
      batch.set(ref2, {
        User: User,
        Message: 'Your volunteer request is accepted by ' + User.Name,
        NewDate: date,
        Id: id,
        Uid: props.User.Id,
      });
      batch.update(ref3, {
        Read: true,
      });
      batch
        .commit()
        .then(() => {
          setVisible(false);
          DevSettings.reload();
        })
        .catch(err => {
          setVisible(false);
        });
    }
  };
  if (!Admin) {
    return (
      <View style={model.view}>
        <IconButton
          label="Request for Volunteer"
          icon="bike-fast"
          onPress={() => {
            const id = uuid.v4();
            if (!User) {
              Alert.alert('Opps!', 'Please try again letter');
              return;
            }
            setVisible(true);
            firestore()
              .collection('Donate')
              .doc(id)
              .set({
                User: User,
                Message: User.Name + ' is requested for volunteering.',
                Read: false,
                NewDate: new Date(),
                Type: 'request',
                Id: id,
              })
              .then(() => {
                setVisible(false);
                Alert.alert(
                  'Success',
                  'Your request is now pending. Wait for response.',
                );
              })
              .catch(error => {
                setVisible(false);
                Alert.alert(error.code, error.message);
              });
          }}
        />
      </View>
    );
  } else {
    return (
      <ScrollView>
        <AddPost onPress={Name => SaveImage(Name)} />
        {Notifications ? (
          Notifications.length > 0 ? (
            Notifications.map(doc => (
              <VolunteerCart
                key={doc.NewDate}
                navigation={props.navigation}
                data={doc}
                uid={params.uid}
                name={params.name}
                date={date}
                reject={val => Reject(val)}
                accept={val => Accept(val)}
              />
            ))
          ) : (
            <Text style={{margin: 10, textAlign: 'center'}}>
              Request Box Empty
            </Text>
          )
        ) : (
          <AnimatedLoader
            visible={true}
            overlayColor="rgba(255, 255, 255, 0.459)"
            source={require('./../Files/88967-food-delivery-service.json')}
            animationStyle={model.loader}
            speed={1}>
            <Text style={{color: 'black'}}>Loading...</Text>
          </AnimatedLoader>
        )}
        <AnimatedLoader
          visible={visible}
          overlayColor="rgba(255, 255, 255, 0.459)"
          source={require('./../Files/88967-food-delivery-service.json')}
          animationStyle={model.loader}
          speed={1}>
          <Text style={{color: 'black'}}>{text}</Text>
        </AnimatedLoader>
      </ScrollView>
    );
  }
};

export default Volunteer;
const AddPost = props => {
  const [Name, setName] = React.useState(null);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FB6127',
        borderRadius: 10,
        padding: 5,
        margin: 5,
      }}>
      <TextInput
        style={model.input}
        label="Donar Name"
        placeholder="Donar Name..."
        value={Name}
        onChangeText={val => setName(val)}
      />
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          margin: 10,
          borderRadius: 10,
          backgroundColor: 'white',
          padding: 10,
          paddingHorizontal: 35,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => props.onPress(Name)}>
        <Icon
          style={{
            marginHorizontal: 10,
          }}
          name="camera"
          size={35}
          color="#FB6127"
        />
        <Text style={{fontSize: 20}}>Add Post</Text>
      </TouchableOpacity>
    </View>
  );
};
