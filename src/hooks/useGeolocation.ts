import { useEffect, useState } from "react";

// interface coordinate {
//   lat: string;
//   lng: string;
// }

export function useGeolocation() {
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
  // console.log(positiion);
  return { positiion, error };
}
