import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

export const useSignalR = (onLocationReceived: (location: any) => void) => {
  const connection = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") {
      return;
    }

    connection.current = new signalR.HubConnectionBuilder()
      .withUrl("https://tech-test.raintor.com/Hub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    connection.current
      .start()
      .then(() => {
        console.log("SignalR connection started");
      })
      .catch((error) => {
        console.error("SignalR connection failed:", error);
      });

    connection.current.on("ReceiveLatLon", (payload) => {
      console.log(payload, "received");
      onLocationReceived(payload);
    });

    return () => {
      connection.current?.stop();
    };
  }, [onLocationReceived]);

  const sendLatLon = (lat: number, lon: number, userName: string) => {
    console.log(lat, lon, userName);
    connection.current
      ?.invoke("SendLatLon", lat, lon, userName)
      .catch(console.error);
  };

  const onReceiveLocation = (payload: any) => {
    onLocationReceived(payload);
  };

  return { sendLatLon, onReceiveLocation };
};
