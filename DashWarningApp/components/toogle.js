import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";

const Toogle = (props) => {

  if (props.name == "gps"){

  }
  else{

  }

  let [gpsStatus, setGpsStatus] = useState("0")
  let [drowsinessStatus, setDrowsinessStatus] = useState("0")


  const getData = async () => {
    try {
     const response = await fetch('http://ec2-34-224-65-150.compute-1.amazonaws.com/api/user/auth?user=user&password=password');
     const json = await response.json();
     setGpsStatus(json["gps_status"])
     setDrowsinessStatus(json["drowsiness_status"])

   } catch (error) {
     console.error(error);
   } 
  }

  const [isEnabled, setIsEnabled] = useState(false);


  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Switch style={{transform: [{ scaleX: 2.5 }, { scaleY: 2.5 }] }}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={props.name}
      />
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

export default Toogle;