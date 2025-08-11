import React from 'react';
import EditControlExample from './edit-control';
import { createRoot } from 'react-dom/client';

const example = (
  <div>
    <h1>React-Leaflet-Draw-Next example</h1>
    <EditControlExample onChange={onChange} />
  </div>
);

function onChange(geojson: unknown) {
  // eslint-disable-next-line no-console
  console.log('geojson changed', geojson);
}

createRoot(document.getElementById('app') as HTMLElement).render(example);


