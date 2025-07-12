import { useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

export const useSignalR = (onLocationReceived: (location: any) => void) => {
  const connection = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    connection.current = new signalR.HubConnectionBuilder()
      .withUrl('https://tech-test.raintor.com/Hub', {
        skipNegotiation: true,
        transport: 1 
      })
      .withAutomaticReconnect()
      .build();

    connection.current.start().catch((error) => {
      console.error("SignalR connection failed:", error);
    });

    connection.current.on('ReceiveLatLon', (payload) => {
      onLocationReceived(payload);
    });

    return () => {
      connection.current?.stop();
    };
  }, []);

  const sendLatLon = (lat: number, lon: number, userName: string) => {
    connection.current?.invoke('SendLatLon', lat, lon, userName).catch(console.error);
  };

  return { sendLatLon };
};
