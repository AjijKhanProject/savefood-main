import auth from '@react-native-firebase/auth';
import React from 'react';
import {Alert, Text, View} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import {TextInput} from 'react-native-paper';
import IconButton from './button/IconButton';
import model from './Styles/model';

const Forget = () => {
  const [Email, setEmail] = React.useState(null);
  const [loader, setLoader] = React.useState(false);

  return (
    <View style={model.view}>
      <Text style={model.headerText}>Enter a valid email address</Text>
      <TextInput
        style={model.input}
        placeholder="Email"
        value={Email}
        onChangeText={setEmail}
        mode="outlined"
      />
      <IconButton
        style={{marginVertical: 30}}
        // icon="skip-next"
        label="Send Email"
        onPress={() => {
          if (!Email) {
            Alert.alert('Wrong', 'Wrong email address');
            return;
          }
          setLoader(true);
          //code for forget
          auth()
            .sendPasswordResetEmail(Email)
            .then(() => {
              Alert.alert(
                'Success',
                'Please check your email address.A link has sent to your email.',
              );
              setLoader(false);
            })
            .catch(err => {
              Alert.alert(err.code, err.message);
              setLoader(false);
            });
        }}
      />
      <AnimatedLoader
        visible={loader}
        overlayColor="rgba(255, 255, 255, 0.459)"
        source={require('./Files/88967-food-delivery-service.json')}
        animationStyle={model.loader}
        speed={1}>
        <Text style={{color: 'black'}}>Loading...</Text>
      </AnimatedLoader>
    </View>
  );
};

export default Forget;
