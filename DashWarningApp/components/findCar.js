import { StyleSheet, View, Dimensions, Image } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

export default function FindCar() {
    return ( <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation = {true}
          initialRegion={{
            latitude: 53.994746,
            longitude: -6.403470915457154,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}       
        >
            <Marker showCallout coordinate={{ latitude :  53.994746, longitude : -6.403470915457154  }}>
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