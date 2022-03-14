import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import {FAB} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Cart from './cart/Cart';
import model from './Styles/model';

const Post = props => {
  const window = Dimensions.get('window');
  const navigation = props.navigation;
  const [data, setData] = React.useState([]);
  const [User, setUser] = React.useState(null);

  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        navigation.navigate('Home', {email: user.email, uid: user.uid});
      }
    });
    SplashScreen.hide();
  }, []);
  React.useEffect(() => {
    firestore()
      .collection('Post')
      .orderBy('NewDate', 'desc')
      .onSnapshot(data => {
        if (data) {
          let arr = [];
          data.forEach(item => {
            arr.push(item.data());
          });
          setData(arr);
        } else {
          setData([]);
        }
      });
  }, []);
  //default style of post
  const styles = StyleSheet.create({
    view: {
      marginTop: 0,
      marginBottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      width: window.width,
      height: window.height,
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
    },
  });

  return (
    <SafeAreaView style={styles.view}>
      <ScrollView>
        {data ? (
          data.length > 0 ? (
            data.map(data => <Cart key={data.Id} data={data} />)
          ) : (
            <Text style={{marginTop: 100}}>No Data Available</Text>
          )
        ) : (
          <AnimatedLoader
            visible={true}
            overlayColor="rgba(255, 255, 255, 0.459)"
            source={require('./Files/88967-food-delivery-service.json')}
            animationStyle={model.loader}
            speed={1}>
            <Text style={{color: 'black'}}>Loading...</Text>
          </AnimatedLoader>
        )}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon={() => <Icon name="login" color="#ffff" size={20} />}
        label="Log In"
        onPress={() => {
          navigation.navigate('LogIn');
        }}
      />
    </SafeAreaView>
  );
};

export default Post;
