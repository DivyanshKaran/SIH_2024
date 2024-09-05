// import { useGeolocation } from "@/hooks/useGeolocation";
import { fetchWeatherApi } from "openmeteo";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";
// const API_KEY = "c8bd12fc9a1e4a4792290328240409";

// interface EnviormentData {
//   temprature: number;
//   feels_like: number;
//   pressure: number;
//   humidity: number;
//   sea_level: number;
//   grnd_level: number;
//   wind_speed: number;
//   wind_degree: number;
//   wind_gust: number;
//   clouds: number;
//   city: string;
//   time: Date;
// }

export default function EnviormentFactors() {
  const [data, setData] = useState({});
  // console.log(data);
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [location, setlocation] = useState();
  const [error, setError] = useState("");

  function getPosition() {
    if (!navigator.geolocation) {
      setError("Please give permission to fetch us your location");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // console.log(pos.coords);
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (error) => {
        setError("Please give permission to fetch us your location");
      }
    );
  }
  // let weatherData;
  async function setLocation() {
    // console.log(position);
    if (position.lat === 0) return;
    // //   const API_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${positiion.lat}&lon=${positiion.lng}&exclude={part}&appid=${API_KEY}`;
    // // const API_URL = `http://www.7timer.info/bin/api.pl?lon=${positiion.lng}&lat=${positiion.lat}&product=astro&output=json`;
    // const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=e41da91f19cc43e683c105740232806&q=${position.lat},${position.lng}&days=7%60`;
    // // const respose = await fetch(API_URL);
    // // const rdata = await respose.json();
    // // console.log(rdata);
    // // const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${position.lat},${position.lng}`;
    // // console.log(API_URL);
    // const options = {
    //   method: "GET",
    //   headers: {
    //     "x-rapidapi-key": "f7baf5e290msh65ad94bd3efd709p138069jsn0933db9a73de",
    //     "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    //   },
    // };
    // try {
    //   const response = await fetch(API_URL);
    //   const result = await response.json();
    //   console.log(result);
    //   data = {
    //     ...result.current,
    //     // ...result.forecast,
    //     ...result.location,
    //   };
    //   console.log(data);
    // } catch (error) {
    //   console.error(error);
    // }
    // console.log("I was here");
    const params = {
      latitude: position.lat,
      longitude: position.lng,
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "is_day",
        "precipitation",
        "rain",
        "showers",
        "weather_code",
        "cloud_cover",
        "pressure_msl",
        "surface_pressure",
        "wind_speed_10m",
        "wind_direction_10m",
        "wind_gusts_10m",
      ], // Process first location. Add a for-loop for multiple locations or weather models
      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "sunrise",
        "sunset",
        "daylight_duration",
        "sunshine_duration",
        "uv_index_max",
        "precipitation_sum",
        "rain_sum",
        "precipitation_hours",
        "precipitation_probability_max",
        "wind_speed_10m_max",
        "wind_gusts_10m_max",
        "wind_direction_10m_dominant",
      ],
      timezone: "auto",
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    // const requestOptions = {
    //   method: "GET",
    // };
    // const API_KEY_REVERSE_GEOLOCATION = "5a48d03dc1f848709a82509439b502a7";
    // fetch(
    //   `https://api.geoapify.com/v1/geocode/reverse?lat=${position.lat}&lon=${position.lng}&apiKey=${API_KEY_REVERSE_GEOLOCATION}`,
    //   requestOptions
    // )
    //   .then((response) => response.json())
    //   .then((result) => setlocation(result.features[0].properties))
    //   .catch((error) => console.log("error", error));
    const responses = await fetchWeatherApi(url, params);
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    const response = responses[0];
    // console.log(response);
    // const utcOffsetSeconds = response.utcOffsetSeconds();
    // const timezone = response.timezone();
    // const timezoneAbbreviation = response.timezoneAbbreviation();
    // const latitude = response.latitude();
    // const longitude = response.longitude();

    const current = response.current()!;
    // const hourly = response.hourly()!;
    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
      current: {
        // time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature: current.variables(0)!.value().toFixed(2),
        RelativeHumidity: current.variables(1)!.value().toFixed(2),
        // isDay: current.variables(2)!.value() ? "True" : "False",
        Precipitation: current.variables(3)!.value().toFixed(2),
        Rain: current.variables(4)!.value().toFixed(2),
        Showers: current.variables(5)!.value().toFixed(2),
        WeatherCode: current.variables(6)!.value().toFixed(2),
        CloudCover: current.variables(7)!.value().toFixed(2),
        Pressure: current.variables(8)!.value().toFixed(2),
        SurfacePressure: current.variables(9)!.value().toFixed(2),
        WindSpeed: current.variables(10)!.value().toFixed(2),
        WindDirection: current.variables(11)!.value().toFixed(2),
        WindGusts: current.variables(12)!.value().toFixed(2),
      },
      daily: {
        // time: range(
        //   Number(daily.time()),
        //   Number(daily.timeEnd()),
        //   daily.interval()
        // ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        weatherCode: daily.variables(0)!.valuesArray()!,
        temperature2mMax: daily.variables(1)!.valuesArray()!,
        temperature2mMin: daily.variables(2)!.valuesArray()!,
        sunrise: daily.variables(3)!.valuesArray()!,
        sunset: daily.variables(4)!.valuesArray()!,
        daylightDuration: daily.variables(5)!.valuesArray()!,
        sunshineDuration: daily.variables(6)!.valuesArray()!,
        uvIndexMax: daily.variables(7)!.valuesArray()!,
        precipitationSum: daily.variables(8)!.valuesArray()!,
        rainSum: daily.variables(9)!.valuesArray()!,
        precipitationHours: daily.variables(10)!.valuesArray()!,
        precipitationProbabilityMax: daily.variables(11)!.valuesArray()!,
        windSpeed10mMax: daily.variables(12)!.valuesArray()!,
        windGusts10mMax: daily.variables(13)!.valuesArray()!,
        windDirection10mDominant: daily.variables(14)!.valuesArray()!,
      },
    };
    // console.log(weatherData);
    setData(weatherData.current);
  }
  // useEffect(() => setLocation, [position]);
  useEffect(
    function () {
      getPosition();
      // console.log(position);
      setLocation();
    },
    []
    // [position]
  );
  if (error) {
    return <h1>{error}</h1>;
  }
  // const { time, ...loopData } = data;
  return (
    <div>
      <h1 className="mb-12">
        Based On your location
        {/* In {} at {} */}
      </h1>
      <Table>
        <TableCaption>The enviorment factors around you</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Enviormental Factor</TableHead>
            <TableHead className="text-center">Value At Present</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(data).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
