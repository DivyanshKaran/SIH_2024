import { useGeolocation } from "@/hooks/useGeolocation";
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

interface EnviormentData {
  temprature: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
  wind_speed: number;
  wind_degree: number;
  wind_gust: number;
  clouds: number;
  city: string;
  time: Date;
}

export default function EnviormentFactors({ data }: EnviormentData) {
  // console.log(data);
  const [positiion, setPosition] = useState({ lat: 0, lng: 0 });
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
  useEffect(getPosition, []);
  // let data: EnviormentData;
  async function setLocation() {
    //   const API_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${positiion.lat}&lon=${positiion.lng}&exclude={part}&appid=${API_KEY}`;
    // const API_URL = `http://www.7timer.info/bin/api.pl?lon=${positiion.lng}&lat=${positiion.lat}&product=astro&output=json`;
    // // const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=e41da91f19cc43e683c105740232806&q=${positiion}&days=7%60`;
    // const respose = await fetch(API_URL);
    // const rdata = await respose.json();
    // console.log(rdata);
    const url =
      "https://weatherapi-com.p.rapidapi.com/current.json?q=Hazaribagh%2C-0.13";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f7baf5e290msh65ad94bd3efd709p138069jsn0933db9a73de",
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => setLocation, [positiion]);
  console.log(positiion);
  if (error.length > 0) {
    return <h1>{error}</h1>;
  }
  const { time, ...loopData } = data;
  return (
    <div>
      <h1 className="mb-12">
        Based On your location, In {data.city} at {time.toLocaleTimeString()}
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
          {Object.entries(loopData).map(([key, value]) => (
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
