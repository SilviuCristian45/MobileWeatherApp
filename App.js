import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
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
    setCity(response.name)
    setTemperature(response.main.temp_max)
  }

  return (
    <View style={styles.container}>
      <Text> Your city is {city} </Text>
      <Text> Your city is {temperature} </Text>
      <StatusBar style="auto" />
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
  title: {
    color: 'red'
  }
});
  
