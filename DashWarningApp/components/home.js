import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, 
    Button, Dimensions, TextInput, 
    ImageBackground, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';


export default function Home({ navigation }) {

  const Item = ({ name, file, des }) => {
    return(
    <TouchableOpacity style={{flexDirection:'row'}} 
      onPress={()=>{navigation.navigate( 'SymbolInfo', {title: name, file: file, content: des } )}
      } >
        <Image style={{height: 70, flex: 1}} source={file}/>
        <Text style={{height: 70, flex: 3, backgroundColor:'black', textAlignVertical:"center", 
        color:'white', fontSize:22, paddingLeft:20, fontWeight:'bold'}}> {name}</Text>
      </TouchableOpacity>
  );}

  const renderItem = ({ item }) => (
    <Item name={item.name} file={''+item.file} des={item.des} />
  );
  

  return (
    <>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
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
    home:{
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'gray'
    }
  });


  const DATA = [
    {
      "file": require("./0.png"),
      "name": "Headlight Range Control",
      "des": "There is a fault in the headlight range control system. Please contact an authorised repairer"
      },
      {
      "file": require("./1.png"),
      "name": "Automatic Gearbox",
      "des": "If this symbol appears it may be accompanied with a message such as 'please press brake pedal and select gear again'. If the symbol is still on even after pressing the brake, please visit an authorised repairer "
      },
      {
      "file": require("./2.png"),
      "name": "Engine Oil Pressure Light",
      "des": "Switch off the engine immediately and do not restart. Check the engine oil level"
      },
      {
      "file": require("./3.png"),
      "name": "Battery Light",
      "des": "There is an alternator fault or a fault in the vehicle eletrical system. If the vehicle can start, drive to an authorised repaier without delay and avoid using eletrical equipment that is not absolutely necessary because this could drain the battery."
      },
      {
      "file": require("./4.png"),
      "name": "Brake Light",
      "des": "Check to ensure the handbrake is not applied. If light still persist, stop the vehicle and check the brake fluid level, if low top up. If sysmbol persist, contact an authorised repairer."
      },
      {
      "file": require("./5.png"),
      "name": "Anti-lock Brake Light",
      "des": "Anti-loxk braking system fault. The vehicle can still be braked in the normal way but the ABS and ESP may not function. Drive carefully to an authorised repairer to have the ABS system examined."
      },
      {
      "file": require("./6.png"),
      "name": "Airbag And Seat Belt Light",
      "des": "If this lamp lights up or flashed there is a fault in the airbag or seat belt system. Drive caefully to an authorised repairer without delay and have the fault rectified."
      },
      {
      "file": require("./7.png"),
      "name": "Seat Belt Buckles",
      "des": "This lamp appears if the driver or front passsenger has not got their seat belts fastened. If light still appears after seat belt fastened, please contact an authorised repairer"
      },
      {
      "file": require("./8.png"),
      "name": "Engine Light",
      "des": "If the light is fixed, remove the key for 30sec then refit and start the engine. If this still persist, take it to an authorised repairer. "
      },
      {
      "file": require("./9.png"),
      "name": "Boot Light",
      "des": "Check that the boot lid is closed properly. Otherwise please contact an authorised repairer"
      },
      {
      "file": require("./10.png"),
      "name": "Tyre Pressure Light",
      "des": "Check and if necessary adjust the typre pressure on all wheels. If symbols persist, have the tyre repaired or replaced."
      }
  ];