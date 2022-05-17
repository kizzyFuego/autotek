import * as React from 'react';
import { StyleSheet, View, Text, 
  Button, Dimensions, TextInput, 
  ImageBackground, SafeAreaView, FlatList, Image } from 'react-native';

export default function Login({ navigation, props }) {
    //var [loginStatus, setLoginStatus] = React.useState(0)
    let email = ''
    let password = ''
  
    const submitLogin =()=>{
      //verity if login is successful and setState to true
      if (email == 'user@gmail.com' && password =='password' ){
        navigation.navigate('Home')
        //alert (email+' : '+password)
        //loginStatus = true
        //setLoginStatus(1)
        //alert(previousState)
      }
    };
    return (   
      <View style = {styles.login}>
          <TextInput
            placeholder='Email'
            onChangeText={(text)=>{email=text}}
            style = {styles.formInput}
          />
          <TextInput
            placeholder='Password'
            onChangeText={(text)=>{password=text}}
            style = {styles.formInput}
          />
          <Button title='Submit' style = {styles.submitButton} onPress={()=>{submitLogin()}}/>
        
      </View>  
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formInput:{
      width: Dimensions.get('window').width/2,
      borderRadius: 100,
      borderWidth: 2, 
      borderColor: 'blue',
      textAlign: 'center',
      marginBottom: 20
    },
    submitButton:{
      width: Dimensions.get('window').width/3,
      borderRadius: 100,
    },
    login:{
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center',
    },
    imgBackground: {
      width: '100%',
      height: '100%',
      flex: 1 
    }
  
  });