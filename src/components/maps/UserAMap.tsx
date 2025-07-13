import { useEffect, useState } from "react";
import { useSignalR } from "../../hooks/useSignalR";
import { MapPinCheck, WifiOff } from "lucide-react";
import ErrorMessage from "../ui/ErrorMessage";
import ErrorBoundary from "../ui/ErrorBoundary";

function UserAMapContent() {
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastCoordinates, setLastCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const { sendLatLon } = useSignalR((location) => {
    console.log("Location received:", location);
    setLastCoordinates({ lat: location.lat, lon: location.lon });
  });

  useEffect(() => {
    const testConnection = () => {
      try {
        const lat = 23.8103 + Math.random() / 100;
        const lon = 90.4125 + Math.random() / 100;
        sendLatLon(lat, lon, "mdsolimansoad@gmail.com");
        setIsConnected(true);
        setError(null);
      } catch (err) {
        setError("Failed to connect to location service");
        setIsConnected(false);
      }
    };

    testConnection();

    const interval = setInterval(() => {
      if (isConnected) {
        try {
          const lat = 23.8103 + Math.random() / 100;
          const lon = 90.4125 + Math.random() / 100;
          sendLatLon(lat, lon, "mdsolimansoad@gmail.com");
          setLastCoordinates({ lat, lon });
        } catch (err) {
          setError("Failed to send location data");
          setIsConnected(false);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [sendLatLon, isConnected]);

  const handleRetry = () => {
    setError(null);
    setIsConnected(false);

    window.location.reload();
  };

  if (error) {
    return (
      <div className="p-6 bg-white shadow-sm rounded-lg max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">User A Map</h1>
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-sm rounded-lg max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">User A Map</h1>

      {!isConnected ? (
        <div className="text-center py-8">
          <div className="flex items-center justify-center mb-4">
            <WifiOff className="animate-pulse text-yellow-500" size={48} />
          </div>
          <p className="text-gray-600 mb-4">
            Connecting to location service...
          </p>
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-green-600 font-medium">Connected</p>
          </div>

          <p className="text-gray-700 mb-4">
            User A is sending their location every 2 seconds.
          </p>

          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center justify-center mb-2">            
              <MapPinCheck color="green" size={100} />
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Coordinates are being sent to the server...
            </p>

            {lastCoordinates && (
              <div className="text-xs text-gray-500 bg-white p-2 rounded border">
                <p>
                  Last sent: {lastCoordinates.lat.toFixed(6)},{" "}
                  {lastCoordinates.lon.toFixed(6)}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function UserAMap() {
  return (
    <ErrorBoundary>
      <UserAMapContent />
    </ErrorBoundary>
  );
}
