import * as React from 'react';
import { StyleSheet, View, Text, 
  Button, Dimensions, TextInput, 
  ImageBackground, SafeAreaView, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import FindCar from './components/findCar';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  Image,
  Switch
} from '@react-navigation/drawer';

function submitLogin()
{
  console.warn(this.state.email)
}

function Login({ navigation }) {
  return (
    

    <View style = {styles.login}>
      <Text style={{paddingBottom:20}}>STILL IN DEVELOPMENT</Text>
        <TextInput
          placeholder='Email'
          onChangeText={(text)=>{this.state.email=text}}
          style = {styles.formInput}
        />
        <TextInput
          placeholder='Password'
          onChangeText={(text)=>{this.state.password=text}}
          style = {styles.formInput}
        />
        <Button title='Submit' style = {styles.submitButton} onPress={()=>{submitLogin()}}/>
      
    </View>
    
  );
}

function Home({ navigation }) {
  return (
    <>
      <ImageBackground style={ styles.imgBackground } source={require('./assets/home.jpeg')}>
        <View>

        </View>
      </ImageBackground>
    </>
  );
}

function Logout({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Logout</Text>
    </View>
  );
}

function toggleGPS(){
  if (this.state.gps_tracking_status == 'ON'? this.state.gps_tracking_status = 'OFF': this.state.gps_tracking_status = 'ON' );
}

function toggleSleep(){
  if (this.state.sleep_detection_status == 'ON'? this.state.sleep_detection_status = 'OFF': this.state.sleep_detection_status = 'ON' );
}


function Setting({ navigation }) {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize:30}}>STILL IN DEVELOPMENT</Text>

    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      //drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Locate Car" component={FindCar} />
      <Drawer.Screen name="Settings" component={Setting} />
      {this.state.login_status == 1?
        <Drawer.Screen name="Logout" component={Logout} />
      :<Drawer.Screen name="Login" component={Login} />
      }
    </Drawer.Navigator>
  );
}

export default function App() {
  state = {
    login_status : 0,
    email : '',
    password : '',
    sleep_detect: 1,
    gps_track: 1,
    sleep_detection_status:'ON',
    gps_tracking_status:'ON'
  };
  return (
    
    <NavigationContainer style = {styles.appDesign}>
      <MyDrawer />
    </NavigationContainer>
  
  );
}

const Drawer = createDrawerNavigator();
const backgroundImage = require('./assets/background.png')


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
  home:{
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray'
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
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  }

});

const DATA = [
  {
		"file": "0.png",
		"name": "Headlight Range Control",
		"des": "There is a fault in the headlight range control system. Please contact an authorised repairer"
		},
		{
		"file": "1.png",
		"name": "Automatic Gearbox",
		"des": "If this symbol appears it may be accompanied with a message such as 'please press brake pedal and select gear again'. If the symbol is still on even after pressing the brake, please visit an authorised repairer "
		},
		{
		"file": "2.png",
		"name": "Engine Oil Pressure Light",
		"des": "Switch off the engine immediately and do not restart. Check the engine oil level"
		},
		{
		"file": "3.png",
		"name": "Battery Light",
		"des": "There is an alternator fault or a fault in the vehicle eletrical system. If the vehicle can start, drive to an authorised repaier without delay and avoid using eletrical equipment that is not absolutely necessary because this could drain the battery."
		},
		{
		"file": "4.png",
		"name": "Brake Light",
		"des": "Check to ensure the handbrake is not applied. If light still persist, stop the vehicle and check the brake fluid level, if low top up. If sysmbol persist, contact an authorised repairer."
		},
		{
		"file": "5.png",
		"name": "Anti-lock Brake Light",
		"des": "Anti-loxk braking system fault. The vehicle can still be braked in the normal way but the ABS and ESP may not function. Drive carefully to an authorised repairer to have the ABS system examined."
		},
		{
		"file": "6.png",
		"name": "Airbag And Seat Belt Light",
		"des": "If this lamp lights up or flashed there is a fault in the airbag or seat belt system. Drive caefully to an authorised repairer without delay and have the fault rectified."
		},
		{
		"file": "7.png",
		"name": "Seat Belt Buckles",
		"des": "This lamp appears if the driver or front passsenger has not got their seat belts fastened. If light still appears after seat belt fastened, please contact an authorised repairer"
		},
		{
		"file": "8.png",
		"name": "Engine Light",
		"des": "If the light is fixed, remove the key for 30sec then refit and start the engine. If this still persist, take it to an authorised repairer. "
		},
		{
		"file": "9.png",
		"name": "Boot Light",
		"des": "Check that the boot lid is closed properly. Otherwise please contact an authorised repairer"
		},
		{
		"file": "10.png",
		"name": "Tyre Pressure Light",
		"des": "Check and if necessary adjust the typre pressure on all wheels. If symbols persist, have the tyre repaired or replaced."
		}
];