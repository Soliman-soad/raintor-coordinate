import { useEffect } from "react";
import { useSignalR } from "../../hooks/useSignalR";
import { MapPin } from "lucide-react";

export default function UserAMap() {
  const { sendLatLon } = useSignalR(() => {});

  useEffect(() => {
    const interval = setInterval(() => {
      const lat = 23.8103 + Math.random() / 100; // Simulated coords
      const lon = 90.4125 + Math.random() / 100;
      sendLatLon(lat, lon, "mdsolimansoad@gmail.com");
    }, 2000);

    return () => clearInterval(interval);
  }, [sendLatLon]);

  return (
    <div className="p-6 bg-white shadow-sm rounded-lg max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">User A Map</h1>
      <p className="text-gray-700">
        User A is sending their location every 2 seconds.
      </p>
      {/* Here you could integrate a map component to visualize the coordinates */}
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <div className="flex items-center justify-center mb-2">
          <MapPin className="animate-bounce" color="green" size={100} />
        </div>
        <p className="text-sm text-gray-600">
          Coordinates are being sent to the server...
        </p>
      </div>
    </div>
  );
}
