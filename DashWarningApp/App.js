//import React, { useState, useEffect } from 'react';
import * as React from 'react';
import { StyleSheet, View, Text, 
  Button, Dimensions, TextInput, 
  ImageBackground, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Home from './components/home';
import FindCar from './components/findCar';
import Login from './components/login';
import Settings from './components/settings';
import Scan from './components/scan';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function SymbolInfo({route}){
	return (<View style={{alignItems:'center'}}>
        <Image style={{height: 120, width:120, alignItems:'center', marginTop:50}} source={route.params.file}/>
				<Text style={{fontSize:20, textAlign:'center', marginTop:20}}> {route.params.content}</Text>
			</View>)
}

function Logout({ navigation }) {
  //[loginStatus, setLoginStatus] = React.useState(1)
}

function Root(props) {
	const Drawer = createDrawerNavigator();
  //let [loginStatus, setLoginStatus] = React.useState(false)
  props.loginStatus = false
	//var loginStatus = 0
	return (
		<Drawer.Navigator>       
			<Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Scan" component={Scan} />
			<Drawer.Screen name="Locate Car" component={FindCar} />
			<Drawer.Screen name="Settings" component={Settings} />
			{props.loginStatus?
		  	<Drawer.Screen name="Logout" component={Logout} />
			:<Drawer.Screen name="Login" component={Login} />
		}
	  </Drawer.Navigator>
	);
}


export default function App() {
  const Stack = createNativeStackNavigator();
  
  return (
    <>
      <NavigationContainer style = {styles.appDesign}>
        
		<Stack.Navigator>
			<Stack.Screen name="Root" component={Root} options={{ headerShown: false }}/>
        	<Stack.Screen name="SymbolInfo" component={SymbolInfo} 
			options={({ route }) => ({ title: route.params.title })} />
    	</Stack.Navigator>

      </NavigationContainer>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1 
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  }
});
