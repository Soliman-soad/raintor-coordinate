"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useSignalR } from "../../hooks/useSignalR";
import L from "leaflet";
import LoadingSpinner from "../ui/LoadingSpinner";

// Fix Leaflet icon paths for Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Dynamically import map components with no SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

export default function UserBMap() {
  const [position, setPosition] = useState<{ lat: number; lon: number } | null>(
    null
  );

  useSignalR((payload) => {
    setPosition({ lat: payload.lat, lon: payload.lon });
  });

  if (!position?.lat) {
    return (
      <div>
        <h2 className="text-4xl text-center mt-8">📍 Live Location Viewer</h2>
        <LoadingSpinner text="location" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-4xl text-center mt-8">📍 Live Location Viewer</h2>
      <div className="max-w-4xl mx-auto p-6 rounded-lg mt-8">
        <MapContainer
          style={{ height: "400px" }}
          bounds={[
            [position.lat, position.lon],
            [position.lat + 0.01, position.lon + 0.01],
          ]}
          boundsOptions={{ padding: [100, 100] }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[position.lat, position.lon]} />
        </MapContainer>
      </div>
    </div>
  );
}
