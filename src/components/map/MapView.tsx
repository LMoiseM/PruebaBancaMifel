import { FC } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface MapViewProps {
  lat: number;
  lng: number;
}

const MapView: FC<MapViewProps> = ({ lat, lng }) => {
  const position: [number, number] = [lat, lng];

  return (
    <MapContainer center={position} zoom={1} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Latitude: {lat}, Longitude: {lng}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
