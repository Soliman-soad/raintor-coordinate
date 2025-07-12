import { useEffect } from 'react';
import { useSignalR } from '../../hooks/useSignalR';

export default function UserAMap() {
  const { sendLatLon } = useSignalR(() => {});

  useEffect(() => {
    const interval = setInterval(() => {
      const lat = 23.8103 + Math.random() / 100; // Simulated coords
      const lon = 90.4125 + Math.random() / 100;
      sendLatLon(lat, lon, 'mdsolimansoad@gmail.com');
    }, 2000);

    return () => clearInterval(interval);
  }, [sendLatLon]);

  return <div>📡 Sending location every 2s...</div>;
}
