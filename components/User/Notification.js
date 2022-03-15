import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import NotificationCart from './../cart/NotificationCart';

const Notification = props => {
  const [data, setData] = React.useState(null);
  const uid = props.route.params.uid;

  React.useEffect(() => {
    firestore()
      .collection('Notification')
      .orderBy('NewDate', 'desc')
      .onSnapshot(doc => {
        if (doc) {
          let arr = [];
          doc.forEach(data => {
            arr.push(data.data());
          });
          setData(arr);
        } else {
          setData([]);
        }
      });
  }, []);
  return (
    <ScrollView>
      {data ? (
        data.length > 0 ? (
          data.map((d, i) =>
            d.Uid == uid ? (
              <NotificationCart key={i} data={d} />
            ) : (
              <View key={i}></View>
            ),
          )
        ) : (
          <Text style={{margin: 10, textAlign: 'center'}}>Empty data</Text>
        )
      ) : (
        <Text style={{margin: 10, textAlign: 'center'}}>Loading.....</Text>
      )}
    </ScrollView>
  );
};

export default Notification;
