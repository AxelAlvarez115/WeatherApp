import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Header from "./components/Header";
import Weather from "./components/Weather";

const API_KEY = "216dd2cd10864c518bc54024261703";

export default function App() {
  const [city, setCity] = useState("Lyon");
  const [coords, setCoords] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        console.log("Refus géolocalisation → fallback Lyon");
      }
    );
  }, []);

  useEffect(() => {
  const fetchWeather = async () => {
    let url = "";

    if (coords) {
      url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${coords.lat},${coords.lon}&days=5`;
    } else {
      url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5`;
    }

    const res = await fetch(url);
    const json = await res.json();

    setCity(json.location.name);
    setWeatherData(json.forecast.forecastday);
  };

    fetchWeather();
  }, [coords, city]);

  return (
    <div className="App">
      <Header />

      <div className="row">
        <div className="col s12 m6 push-m3">
          <Weather
            city={city}
            data={weatherData}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        </div>
      </div>
    </div>
  );
}
