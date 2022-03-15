import auth from '@react-native-firebase/auth';
import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import {TextInput} from 'react-native-paper';
import IconButton from './button/IconButton';
import model from './Styles/model';

const LogIn = props => {
  const [Email, setEmail] = React.useState();
  const [Password, setPassword] = React.useState();
  const navigation = props.navigation;
  const [loader, setLoader] = React.useState(false);

  const window = Dimensions.get('window');
  return (
    <>
      <View style={model.viewLogin}>
        <Image
          style={{width: 250, height: 250}}
          source={require('./Files/logo.png')}
        />
        <Text
          style={{
            margin: 5,
            fontSize: 22,
            fontWeight: 'bold',
            color: 'orange',
          }}>
          Good to see you again!!
        </Text>
        <TextInput
          style={model.input}
          placeholder="E-mail"
          value={Email}
          onChangeText={val => setEmail(val)}
          mode="outlined"
        />
        <TextInput
          style={model.input}
          placeholder="Password"
          value={Password}
          onChangeText={val => setPassword(val)}
          mode="outlined"
          secureTextEntry
        />

        <TouchableOpacity
          style={{marginLeft: 130, marginTop: 10}}
          onPress={() => {
            navigation.navigate('Forget');
          }}>
          <Text style={{fontSize: 15, marginVertical: 5, fontWeight: 'bold'}}>
            Forget Password?
          </Text>
        </TouchableOpacity>

        <IconButton
          style={{
            marginVertical: 20,
          }}
          label="Login"
          onPress={() => {
            // navigation.navigate('Home')
            if (!Email || !Password) {
              Alert.alert('Wrong', 'Please fill all inputs');
              return;
            }
            setLoader(true);
            //code for login
            auth()
              .signInWithEmailAndPassword(Email, Password)
              .then(userCredential => {
                //Alert.alert('Successful','Sign In Successfully')
                setLoader(false);
                //console.log(userCredential)
                const user = userCredential.user;
                navigation.navigate('Home', {email: user.email, uid: user.uid});
                // auth().onAuthStateChanged(user => {

                // })
              })
              .catch(err => {
                Alert.alert('Error', err.message);
                setLoader(false);
              });
          }}
        />

        <IconButton
          style={{
            marginVertical: 0,
            backgroundColor: 'black',
          }}
          label="Signup"
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />

        {/* <TouchableOpacity
            onPress={() => {
            navigation.navigate('SignUp');
            }}>
            <Text
            style={{
                fontSize: 22,
                marginVertical: 10,
                borderBottomColor: 'red',
                borderColor: 'red',
            }}>
            SIgnup
            </Text>
        </TouchableOpacity> */}
      </View>
      <AnimatedLoader
        visible={loader}
        overlayColor="rgba(255, 255, 255, 0.459)"
        source={require('./Files/88967-food-delivery-service.json')}
        animationStyle={model.loader}
        speed={1}>
        <Text style={{color: 'black'}}>Loading...</Text>
      </AnimatedLoader>
    </>
  );
};

export default LogIn;
