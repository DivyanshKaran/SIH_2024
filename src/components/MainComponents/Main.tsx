import { useEffect, useState } from "react";
import FileUploader from "../ui/FileUploader";
import EnviormentFactors from "./EnviormentFactors";

const data = {
  coord: {
    lon: 10.99,
    lat: 44.34,
  },
  weather: [
    {
      id: 501,
      main: "Rain",
      description: "moderate rain",
      icon: "10d",
    },
  ],
  base: "stations",
  main: {
    temp: 298.48,
    feels_like: 298.74,
    temp_min: 297.56,
    temp_max: 300.05,
    pressure: 1015,
    humidity: 64,
    sea_level: 1015,
    grnd_level: 933,
  },
  visibility: 10000,
  wind: {
    speed: 0.62,
    deg: 349,
    gust: 1.18,
  },
  rain: {
    "1h": 3.16,
  },
  clouds: {
    all: 100,
  },
  dt: 1661870592,
  sys: {
    type: 2,
    id: 2075663,
    country: "IT",
    sunrise: 1661834187,
    sunset: 1661882248,
  },
  timezone: 7200,
  id: 3163858,
  name: "Zocca",
  cod: 200,
};

const propData = {
  temprature: data.main.temp,
  feels_like: data.main.feels_like,
  pressure: data.main.pressure,
  humidity: data.main.humidity,
  sea_level: data.main.sea_level,
  grnd_level: data.main.grnd_level,
  wind_speed: data.wind.speed,
  wind_degree: data.wind.deg,
  wind_gust: data.wind.gust,
  clouds: data.clouds.all,
  city: data.name,
  time: new Date(data.dt),
};

function Main() {
  // const [positiion, setPosition] = useState({ lat: 0, lng: 0 });
  // const [error, setError] = useState("");

  // function getPosition() {
  //   if (!navigator.geolocation) {
  //     setError("Please give permission to fetch us your location");
  //     return;
  //   }
  //   navigator.geolocation.getCurrentPosition(
  //     (pos) => {
  //       // console.log(pos.coords);
  //       setPosition({
  //         lat: pos.coords.latitude,
  //         lng: pos.coords.longitude,
  //       });
  //     },
  //     (error) => {
  //       setError("Please give permission to fetch us your location");
  //     }
  //   );
  // }
  // useEffect(getPosition, []);
  return (
    <div className="flex flex-col content-center gap-12">
      <h1 className="">Welcome,Please upload your Crop Image here</h1>
      <FileUploader />
      <EnviormentFactors />
    </div>
  );
}

export default Main;
