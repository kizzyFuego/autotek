import React, { useEffect, useState } from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';


export default function Setting({ navigation }) {

  //let [gpsStatus, setGpsStatus] = useState("0")
  //let [drowsinessStatus, setDrowsinessStatus] = useState("0")
  const [gpsStatus, setGpsStatus] = useState(false)
  const [drowsinessStatus, setDrowsinessStatus] = useState(false)
  const [gpsText, setGpsText] = useState("OFF")
  const [drowText, setDrowText] = useState("OFF")


  const getData = async () => {
    try {
     const response = await fetch('http://ec2-34-224-65-150.compute-1.amazonaws.com/api/user/auth?user=user&password=password');
     const json = await response.json();
     if(json["gps_status"]=="0"){
      setGpsStatus(false)
      setGpsText("OFF")
     }
     else{
      setGpsStatus(true)
      setGpsText("ON")
     }

     if(json["drowsiness_status"]=="0"){
      setDrowsinessStatus(false)
      setDrowText("OFF")
     }
     else{
      setDrowsinessStatus(true)
      setDrowText("ON")
     }
     
   } catch (error) {
     console.error(error);
   } 
  }

  getData()



  
  const gpsToggleSwitch = () => {
    try {
      const base_url = 'http://ec2-34-224-65-150.compute-1.amazonaws.com';
      if(gpsStatus){
        const response =  fetch(base_url+'/api/user/update_gps?user=user&gps_status=0');
        //setGpsStatus(false)
        setGpsText("OFF")
      }
      else{
        const response =  fetch(base_url+'/api/user/update_gps?user=user&gps_status=1');
        //setGpsStatus(true)
        setGpsText("ON")
      }
    } catch (error) {
      console.error(error);
    } 
    setGpsStatus(previousState => !previousState);
  }
  

  const drowsinessToggleSwitch = () =>{
    try {
      const base_url = 'http://ec2-34-224-65-150.compute-1.amazonaws.com';
      if(drowsinessStatus){
        const response =  fetch(base_url+'/api/user/update_drowsiness?user=user&drowsiness_status=0');
        setDrowsinessStatus(false)
        setDrowText("OFF")
      }
      else{
        const response =  fetch(base_url+'/api/user/update_drowsiness?user=user&drowsiness_status=1');
        setDrowsinessStatus(true)
        setDrowText("ON")
      }
    } catch (error) {
      console.error(error);
    } 
    setDrowsinessStatus(previousState => !previousState);
  } 

  return (
    <View style={{alignItems: 'center'}}>
      <Text style={{fontSize:25, fontWeight:'bold', marginTop:50}}>Drowsiness</Text>
      <View style={{flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>

        <View style={styles.container}>
          <Switch style={{transform: [{ scaleX: 2.5 }, { scaleY: 2.5 }] }}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={drowsinessStatus ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={drowsinessToggleSwitch}
            value={drowsinessStatus}
          />
        </View>
        <Text style={{marginLeft:50, fontSize:18}}>OFF</Text>
      </View>

      <Text style={{fontSize:25, fontWeight:'bold', marginTop:50}}>GPS Tracking</Text>
      <View style={{flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
        
      <View style={styles.container}>
          <Switch style={{transform: [{ scaleX: 2.5 }, { scaleY: 2.5 }] }}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={gpsStatus ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={gpsToggleSwitch}
            value={gpsStatus}
          />
        </View>

        <Text style={{marginLeft:50, fontSize:18}}>{gpsText}</Text>
      </View>
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: "center",
    //justifyContent: "center"
  }
});