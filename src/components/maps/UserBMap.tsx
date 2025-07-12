import { useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useSignalR } from "../../hooks/useSignalR";
import "leaflet/dist/leaflet.css";

export default function UserBMap() {
  const [position, setPosition] = useState<{ lat: number; lon: number } | null>(
    null
  );

  useSignalR((payload) => {
    console.log(payload);
    setPosition({ lat: payload.lat, lon: payload.lon });
  });

  console.log(position);

  return (
    <div>
      <h2>📍 Live Location Viewer</h2>
      {position && (
        <MapContainer
          style={{ height: "400px" }}
          bounds={[
            [23.8103, 90.4125],
            [position.lat, position.lon],
          ]}
          boundsOptions={{ padding: [100, 100] }}

        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[position.lat, position.lon]} />
        </MapContainer>
      )}
    </div>
  );
}
