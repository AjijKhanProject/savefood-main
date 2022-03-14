import firestore from '@react-native-firebase/firestore';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Contact from './User/Contact';
import Donate from './User/Donate';
import Profile from './User/Profile';
import UserHome from './User/UserHome';
import Volunteer from './User/Volunteer';

const Home = props => {
  const Tab = createBottomTabNavigator();
  const [UserInformation, setUserInformation] = React.useState(null);
  const params = props.route.params;
  React.useEffect(() => {
    firestore()
      .collection('UserInformation')
      .doc(params.uid)
      .onSnapshot(data => {
        setUserInformation(data.data());
      });
  }, []);
  const header = ({navigation}) => ({
    headerLeft: () => (
      <TouchableOpacity
        style={{marginHorizontal: 10}}
        onPress={() => {
          navigation.navigate('Rank List', {uid: params.uid});
        }}>
        <Ionicons name="trophy-sharp" size={35} color="#F39C12" />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
        style={{marginHorizontal: 10}}
        onPress={() => {
          navigation.navigate('Notification', {uid: params.uid});
        }}>
        <Ionicons
          style={{marginLeft: 80}}
          name="notifications-sharp"
          size={35}
          color="#F39C12"
        />
      </TouchableOpacity>
    ),
    headerTitleAlign: 'center',
  });
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'User Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused
              ? 'person-circle-sharp'
              : 'person-circle-outline';
          } else if (route.name === 'Donate') {
            iconName = focused ? 'pizza' : 'pizza-outline';
          } else if (route.name === 'Volunteer') {
            iconName = focused ? 'walk-outline' : 'walk-sharp';
          } else if (route.name === 'Contact') {
            iconName = focused ? 'ios-call' : 'ios-call-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#F39C12',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="User Home"
        component={UserHome}
        options={({navigation}) => header({navigation})}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{uid: params.uid}}
        options={({navigation}) => header({navigation})}
      />
      <Tab.Screen
        name="Donate"
        component={Donate}
        initialParams={{
          user: UserInformation,
          uid: params.uid,
        }}
        options={({navigation}) => header({navigation})}
      />
      <Tab.Screen
        name="Volunteer"
        component={Volunteer}
        initialParams={{
          user: UserInformation,
          uid: params.uid,
        }}
        options={({navigation}) => header({navigation})}
      />
      <Tab.Screen
        name="Contact"
        component={Contact}
        options={({navigation}) => header({navigation})}
      />
    </Tab.Navigator>
  );
};

export default Home;
