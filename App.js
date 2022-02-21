import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { LogBox, Text } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
import model from './components/Styles/model';
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import Forget from './components/Forget'
import Home from './components/Home'
import RankList from './components/User/RankList'
import Notification from './components/User/Notification'
import Post from './components/Post'
import { Avatar } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
LogBox.ignoreAllLogs()


const Stack = createNativeStackNavigator();
const App = () => {
  const [User, setUser] = React.useState(null)
  const [loader,setLoader]= React.useState(true)
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      placeholder: '#DC7633',
      notification: '#DC7633',
      text: '#000',
      primary: '#DC7633',
    },
    mode: 'exact'
  };
  
  
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Post" component={Post} options={{ headerShown: false }} />
                <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name="Forget" component={Forget} options={{ headerShown: false }} />
                <Stack.Screen name="Rank List" component={RankList}/>
                <Stack.Screen name="Notification" component={Notification}/>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    </PaperProvider>
  )
}

export default App;
 
