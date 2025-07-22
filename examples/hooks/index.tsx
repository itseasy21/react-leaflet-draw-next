import * as React from 'react';
import { createRoot } from 'react-dom/client';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import './style.css';

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import type { FeatureCollection } from 'geojson';

import EditControlFC from './EditControl';

// Fix default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function App() {
  const [geojson, setGeojson] = React.useState<FeatureCollection>({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-73.976344, 40.767867],
              [-73.984754, 40.774237],
              [-73.96742, 40.783206],
              [-73.966733, 40.773067],
              [-73.976344, 40.767867],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-73.966304, 40.773782],
              [-73.965789, 40.790679],
              [-73.953861, 40.792109],
              [-73.953861, 40.778007],
              [-73.966304, 40.773782],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: { radius: 100 },
        geometry: { type: 'Point', coordinates: [-73.962357, 40.796658] },
      },
      {
        type: 'Feature',
        properties: { radius: 200 },
        geometry: { type: 'Point', coordinates: [-73.950858, 40.78691] },
      },
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [
            [-73.972912, 40.78639],
            [-73.984496, 40.780151],
            [-73.984496, 40.776122],
            [-73.970595, 40.781776],
          ],
        },
      },
    ],
  });

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '33%', textAlign: 'center', overflow: 'auto' }}>
        <p>{JSON.stringify(geojson, null, 2)}</p>
      </div>
      <div style={{ width: '67%' }}>
        <MapContainer
          center={[40.776787, -73.968467]}
          zoom={14}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <EditControlFC geojson={geojson} setGeojson={setGeojson} />
        </MapContainer>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
