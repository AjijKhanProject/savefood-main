import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import Cart from './../cart/Cart';
import model from './../Styles/model';

const UserHome = props => {
  const [data, setData] = React.useState([]);

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

  return (
    <ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
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
            source={require('./../Files/88967-food-delivery-service.json')}
            animationStyle={model.loader}
            speed={1}>
            <Text style={{color: 'black'}}>Loading...</Text>
          </AnimatedLoader>
        )}
      </View>
    </ScrollView>
  );
};

export default UserHome;
