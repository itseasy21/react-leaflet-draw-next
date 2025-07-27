import '@testing-library/jest-dom';
import React from 'react';

// Mock @react-leaflet/core
jest.mock('@react-leaflet/core', () => ({
  createControlComponent: jest.fn((createInstance) => {
    return jest.fn((props) => {
      const instance = createInstance(props);
      return React.createElement('div', { 'data-testid': 'leaflet-draw-next' });
    });
  }),
  useLeafletContext: jest.fn(() => ({
    map: {
      on: jest.fn(),
      off: jest.fn(),
      addControl: jest.fn(),
      removeControl: jest.fn(),
      pm: {
        enable: jest.fn(),
        disable: jest.fn(),
        setDrawOptions: jest.fn(),
        setEditOptions: jest.fn(),
        setToolbarOptions: jest.fn(),
        setGlobalOptions: jest.fn(),
      },
    },
    layerContainer: {
      addLayer: jest.fn(),
      removeLayer: jest.fn(),
      getLayers: jest.fn(() => []),
    },
  })),
}));

// Mock Leaflet
jest.mock('leaflet', () => ({
  map: jest.fn(() => ({
    on: jest.fn(),
    off: jest.fn(),
    addControl: jest.fn(),
    removeControl: jest.fn(),
    addLayer: jest.fn(),
    removeLayer: jest.fn(),
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

// Mock Geoman
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