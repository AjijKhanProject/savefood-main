import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LogBox} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Forget from './components/Forget';
import Home from './components/Home';
import LogIn from './components/LogIn';
import Post from './components/Post';
import SignUp from './components/SignUp';
import Notification from './components/User/Notification';
import RankList from './components/User/RankList';
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();
const App = () => {
  const [User, setUser] = React.useState(null);
  const [loader, setLoader] = React.useState(true);
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      placeholder: '#FB6127',
      notification: '#FB6127',
      text: '#000',
      primary: '#FB6127',
    },
    mode: 'exact',
  };

  //Primary color #FB6127

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Post"
            component={Post}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LogIn"
            component={LogIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Forget"
            component={Forget}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Rank List" component={RankList} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
