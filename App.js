import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Location from 'expo-location';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {API_KEY} from '@env'

export default function App() {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState('')
  const [temperature, setTemperature] = useState(0)

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      loadData(location.coords.latitude, location.coords.longitude)
    })();
  }, []);

  async function loadData(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    const response = await (await axios.get(url)).data
    console.log(response)
    setCity(response.name)
    setTemperature(response.main.temp_max)
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40 }} > {city} </Text>
      <View style={styles.inline}>
        <Text style={{ fontSize: 40 }}> {temperature} </Text>
        <MaterialCommunityIcons name="temperature-celsius" size={40} color="black" />
        { weatherIcon("Clouds") }
      </View>
      
     
      <StatusBar style="auto" />
    </View>
  );
}

function weatherIcon(weatherType) {
  switch (weatherType) {
    case "Clouds":
      return (
        <AntDesign name="cloud" size={48} color="black" />
      )
    case "Rain":
      return (
        <FontAwesome5 name="cloud-rain" size={24} color="black" />
      )
  
    default:
      break;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'red'
  },
  inline: {
    display: 'flex',
    flexDirection: 'row'
  }
});

  
