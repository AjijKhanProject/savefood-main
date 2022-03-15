import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {ScrollView, Text} from 'react-native';
import RankCart from '../cart/RankCart';

const RankList = () => {
  const [Users, setUsers] = React.useState([]);
  React.useEffect(() => {
    firestore()
      .collection('UserInformation')
      .orderBy('Point', 'desc')
      .onSnapshot(doc => {
        if (doc) {
          let arr = [];
          doc.forEach(user => {
            if (user.get('Volunteer')) {
              arr.push(user.data());
            }
          });
          setUsers(arr);
        }
      });
  }, []);
  return (
    <ScrollView>
      {Users ? (
        Users.length > 0 ? (
          Users.map(user => <RankCart key={user.Id} data={user} />)
        ) : (
          <Text style={{margin: 10, textAlign: 'center'}}>Empty</Text>
        )
      ) : (
        <Text style={{margin: 10, textAlign: 'center'}}>Loading...</Text>
      )}
    </ScrollView>
  );
};

export default RankList;
