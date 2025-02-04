import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {

  return (
    <>
    <View style={styles.containerTitle}>
      <StatusBar style="auto" />
      <Text style={styles.title}>MyHome</Text>
      <View style={styles.scrollBar}>
        <Text style={styles.text}>prenota</Text>
        <Text style={styles.text}>cibo</Text>
        <Text style={styles.text}>favori</Text>
      </View>
    </View>
    <View style={styles.prenota}>
      <TouchableOpacity   style={[styles.sala, styles.button]} onPress={()=>console.log("sala")}>
        <Text style={styles.buttonT}>sala</Text>
      </TouchableOpacity>
      <TouchableOpacity   style={[styles.studio, styles.button]} onPress={()=>console.log("studio")}>
        <Text style={styles.buttonT}>studio</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={[styles.bagno, styles.button]} onPress={()=>console.log("bagno")}>
        <Text style={styles.buttonT}>bagno</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={[styles.camera, styles.button]} onPress={()=>console.log("camera")}>
        <Text style={styles.buttonT}>camera</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerTitle: {
    paddingVertical: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
    
  },
  title: {
    fontSize: 30,
  },
  text:{
    fontSize: 20,
  },
  scrollBar: {
    width: '100%',
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    alignItems: 'center', 
    height: 50, 
    
  },  
  
  prenota: {
    flex: .5,
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
    height: '10%',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  sala: {
    
    backgroundColor: 'green',
  },
  studio: {
    
    backgroundColor: '#dce775',
  },
  bagno: {
    
    backgroundColor: '#90a4ae',
  },
  camera: {
    
    backgroundColor: '#ffe082',
  },
  buttonT: {
    fontSize: 20,
  }
});
