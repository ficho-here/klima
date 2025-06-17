import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Config from '../config';

export default function Index() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");

  function getWeather() {
    try {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Config.OPENWEATHER_API_KEY}&units=metric`)
        .then(response => response.json())
        .then((data) => {
          setTemp(data.main.temp);
          setHumidity(data.main.humidity);
          setWind(data.wind.speed);
        });
    } catch {
      console.log("error");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter city"
        placeholderTextColor="#999"
        onChangeText={value => setCity(value)}
        value={city}
      />

      <View style={styles.buttonContainer}>
        <Button title="Get Weather" onPress={getWeather} color="#007AFF" />
      </View>

      {temp !== "" && (
        <View style={styles.results}>
          <Text style={styles.resultText}>{temp} °C Temperature</Text>
          <Text style={styles.resultText}>{humidity}% Humidity</Text>
          <Text style={styles.resultText}>{wind} km/h Wind Speed</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#007AFF",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: "#fff",
    marginBottom: 20,
    color: "#333",
  },
  buttonContainer: {
    marginBottom: 30,
  },
  results: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  resultText: {
    fontSize: 20,
    marginBottom: 10,
    color: "#444",
  },
});
