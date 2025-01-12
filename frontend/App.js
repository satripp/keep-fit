import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import HomeScreen from "./src/HomeScreen";
import Profile from "./src/Profile";
import Search from "./src/Search";
import Cals from "./src/Cals";
import VideoPlayer from "./src/VideoPlayer";
import {MaterialIcons} from '@expo/vector-icons'
import {reducer} from './src/reducer'
import {Provider,useSelector} from 'react-redux'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStore,combineReducers} from 'redux'
import {NavigationContainer,DefaultTheme,DarkTheme,useTheme} from '@react-navigation/native'


const rooReducer = combineReducers({
  cardData:reducer
})

const store = createStore(rooReducer)
const Stack = createStackNavigator()
const Tabs = createBottomTabNavigator()

const RootHome = ()=>{
  const {colors} = useTheme()
  return(
    <Tabs.Navigator
      screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;

        if (route.name === 'home') {
          iconName = 'home';
        } else if (route.name === 'search') {
          iconName = 'search';
        } else if(route.name === 'cals'){
          iconName = 'local-fire-department'
        } else if(route.name === 'profile'){
          iconName = 'person'
        }
        // You can return any component that you like here!
        return <MaterialIcons name={iconName} size={32} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: colors.tabIcon,
      inactiveTintColor: 'gray',
    }}
    >
      <Tabs.Screen name="home" component={HomeScreen} />
      <Tabs.Screen name="search" component={Search} />
      <Tabs.Screen name="cals" component={Cals} />
      <Tabs.Screen name="profile" component={Profile} />
    </Tabs.Navigator>
  )
}



export function Navigation() {

  return (
 
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="rootHome" component={RootHome} />
          <Stack.Screen name="search" component={Search} />
          <Stack.Screen name="videoplayer" component={VideoPlayer} />
        </Stack.Navigator>
      </NavigationContainer>
   
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  sectionTitle:{
    fontSize: 24,
    fontWeight: 'bold'
  }
});
