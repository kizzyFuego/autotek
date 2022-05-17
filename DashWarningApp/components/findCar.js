import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import MapView from 'react-native-maps';
import { Marker,  AnimatedRegion, Animated } from 'react-native-maps';

export default function FindCar() {
  let [region, setRegion] = useState({
    longitude: 210.3536,
    latitude: 639.422,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  let [coordinate, setCoordinate] = useState({
    longitude: 210.3536,
    latitude: 639.422,
  });


  const getData = async () => {
    try {
     const response = await fetch('http://ec2-34-224-65-150.compute-1.amazonaws.com/api/gps/get');
     const json = await response.json();
     setRegion({
      longitude: json[0],
      latitude: json[1],
      latitudeDelta: 0.0522,
      longitudeDelta: 0.0221,
     });

     setCoordinate({
      longitude: json[0],
      latitude: json[1],
     });

     console.log(region)
     console.log(coordinate)

   } catch (error) {
     console.error(error);
   } 
 }


  return ( <View style={styles.container}>
    <MapView
      style={styles.map}
      showsUserLocation = {true}
      region={region}
      onMapReady={getData}
      onPress={getData}    
    >
        <Marker showCallout coordinate={coordinate}>
            <Image source={require('../assets/car.png')} style={{height: 35, width:35 }} />
        </Marker>
          
    </MapView>
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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    marginBottom: 70,
  },
});