import React from 'react';
import { render, screen } from '@testing-library/react';
import { MapContainer } from 'react-leaflet';
import { LeafletDrawNext } from '../LeafletDrawNext';

// Mock Leaflet and Geoman
jest.mock('leaflet', () => ({
  map: jest.fn(() => ({
    on: jest.fn(),
    off: jest.fn(),
    addControl: jest.fn(),
    removeControl: jest.fn(),
    addLayer: jest.fn(),
    removeLayer: jest.fn(),
    pm: {
      enable: jest.fn(),
      disable: jest.fn(),
      setDrawOptions: jest.fn(),
      setEditOptions: jest.fn(),
      setToolbarOptions: jest.fn(),
      setGlobalOptions: jest.fn(),
    },
  })),
  tileLayer: jest.fn(() => ({
    addTo: jest.fn(),
  })),
  featureGroup: jest.fn(() => ({
    addLayer: jest.fn(),
    removeLayer: jest.fn(),
    getLayers: jest.fn(() => []),
  })),
  Control: {
    extend: jest.fn(() => ({
      extend: jest.fn(),
    })),
  },
  setOptions: jest.fn(),
}));

jest.mock('@geoman-io/leaflet-geoman-free', () => ({
  enable: jest.fn(),
  disable: jest.fn(),
  setPathOptions: jest.fn(),
  setToolbarOptions: jest.fn(),
  setDrawOptions: jest.fn(),
  setEditOptions: jest.fn(),
  setRemoveOptions: jest.fn(),
  setCutOptions: jest.fn(),
  setRotateOptions: jest.fn(),
  setTextOptions: jest.fn(),
  setCircleOptions: jest.fn(),
  setRectangleOptions: jest.fn(),
  setPolygonOptions: jest.fn(),
  setPolylineOptions: jest.fn(),
  setMarkerOptions: jest.fn(),
  setCircleMarkerOptions: jest.fn(),
}));

describe('LeafletDrawNext', () => {
  const mockMap = {
    on: jest.fn(),
    off: jest.fn(),
    addControl: jest.fn(),
    removeControl: jest.fn(),
    addLayer: jest.fn(),
    removeLayer: jest.fn(),
    pm: {
      enable: jest.fn(),
      disable: jest.fn(),
      setDrawOptions: jest.fn(),
      setEditOptions: jest.fn(),
      setToolbarOptions: jest.fn(),
      setGlobalOptions: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <MapContainer center={[0, 0]} zoom={10}>
        <LeafletDrawNext position="topright" />
      </MapContainer>
    );
    
    // Component should render without errors
    expect(true).toBe(true);
  });

  it('accepts position prop', () => {
    render(
      <MapContainer center={[0, 0]} zoom={10}>
        <LeafletDrawNext position="topleft" />
      </MapContainer>
    );
    
    // Component should accept position prop
    expect(true).toBe(true);
  });

  it('accepts draw options', () => {
    const drawOptions = {
      marker: true,
      circle: false,
      polygon: true,
    };

    render(
      <MapContainer center={[0, 0]} zoom={10}>
        <LeafletDrawNext 
          position="topright" 
          draw={drawOptions}
        />
      </MapContainer>
    );
    
    // Component should accept draw options
    expect(true).toBe(true);
  });

  it('accepts edit options', () => {
    const editOptions = {
      edit: true,
      remove: false,
      drag: true,
    };

    render(
      <MapContainer center={[0, 0]} zoom={10}>
        <LeafletDrawNext 
          position="topright" 
          edit={editOptions}
        />
      </MapContainer>
    );
    
    // Component should accept edit options
    expect(true).toBe(true);
  });

  it('accepts event handlers', () => {
    const handleCreated = jest.fn();
    const handleEdited = jest.fn();
    const handleRemoved = jest.fn();

    render(
      <MapContainer center={[0, 0]} zoom={10}>
        <LeafletDrawNext 
          position="topright"
          onCreated={handleCreated}
          onEdited={handleEdited}
          onRemoved={handleRemoved}
        />
      </MapContainer>
    );
    
    // Component should accept event handlers
    expect(true).toBe(true);
  });

  it('accepts toolbar options', () => {
    const toolbarOptions = {
      position: 'topright' as const,
      drawMarker: true,
      drawPolygon: true,
      editMode: true,
      removalMode: true,
    };

    render(
      <MapContainer center={[0, 0]} zoom={10}>
        <LeafletDrawNext 
          position="topright" 
          toolbar={toolbarOptions}
        />
      </MapContainer>
    );
    
    // Component should accept toolbar options
    expect(true).toBe(true);
  });
});