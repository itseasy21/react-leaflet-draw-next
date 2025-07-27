# React-Leaflet-Geoman API Reference

This document provides a complete reference for the React-Leaflet-Geoman package API.

## Table of Contents

- [Components](#components)
- [Hooks](#hooks)
- [Types](#types)
- [Type Guards](#type-guards)
- [Examples](#examples)

## Components

### `LeafletDrawNext`

The main React component for integrating Geoman.io drawing and editing controls with React-Leaflet.

#### Props

```typescript
interface LeafletDrawNextProps extends ControlOptions {
  // Position and styling
  position?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
  className?: string;
  style?: React.CSSProperties;
  
  // Drawing options
  draw?: GeomanDrawOptions;
  
  // Editing options
  edit?: GeomanEditOptions;
  
  // Toolbar options
  toolbar?: GeomanToolbarOptions;
  
  // Global options
  global?: GeomanGlobalOptions;
  
  // Event handlers
  onCreated?: (event: GeomanCreateEvent) => void;
  onEdited?: (event: GeomanEditEvent) => void;
  onRemoved?: (event: GeomanRemoveEvent) => void;
  onDragStart?: (event: GeomanDragEvent) => void;
  onDrag?: (event: GeomanDragEvent) => void;
  onDragEnd?: (event: GeomanDragEvent) => void;
  onCut?: (event: GeomanCutEvent) => void;
  onRotate?: (event: GeomanRotateEvent) => void;
  
  // Drawing events
  onDrawStart?: (event: GeomanCreateEvent) => void;
  onDrawStop?: (event: GeomanCreateEvent) => void;
  onDrawVertex?: (event: GeomanCreateEvent) => void;
  
  // Editing events
  onEditStart?: (event: GeomanEditEvent) => void;
  onEditStop?: (event: GeomanEditEvent) => void;
  onEditVertex?: (event: GeomanEditEvent) => void;
  onEditMove?: (event: GeomanEditEvent) => void;
  onEditResize?: (event: GeomanEditEvent) => void;
  
  // Removal events
  onRemoveStart?: (event: GeomanRemoveEvent) => void;
  onRemoveStop?: (event: GeomanRemoveEvent) => void;
  
  // Global mode events
  onGlobalDrawModeToggled?: (event: GeomanEvent) => void;
  onGlobalDragModeToggled?: (event: GeomanEvent) => void;
  onGlobalRemovalModeToggled?: (event: GeomanEvent) => void;
  onGlobalCutModeToggled?: (event: GeomanEvent) => void;
  onGlobalRotateModeToggled?: (event: GeomanEvent) => void;
  
  // Lifecycle callbacks
  onMounted?: (map: LeafletMap) => void;
  onUnmounted?: (map: LeafletMap) => void;
}
```

#### Basic Usage

```tsx
import React from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { LeafletDrawNext } from 'react-leaflet-geoman';

const App = () => {
  const handleCreated = (event) => {
    console.log('Layer created:', event);
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup>
        <LeafletDrawNext
          position="topright"
          onCreated={handleCreated}
          draw={{
            marker: true,
            circle: true,
            rectangle: true,
            polygon: true,
            polyline: true,
            circlemarker: true,
            text: true,
          }}
          edit={{
            edit: true,
            remove: true,
            drag: true,
            cut: true,
            rotate: true,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};
```

## Hooks

### `useGeoman`

A custom React hook providing programmatic control over Geoman.io functionalities.

**Important**: The `useGeoman` hook must be used inside a component that is rendered within a `MapContainer`. This is because the hook uses `useMap()` from `@react-leaflet/core` which requires the Leaflet context.

#### Parameters

```typescript
interface UseGeomanOptions {
  draw?: GeomanDrawOptions;
  edit?: GeomanEditOptions;
  toolbar?: GeomanToolbarOptions;
  global?: GeomanGlobalOptions;
  featureGroup?: Layer;
  
  // Event handlers (same as component props)
  onCreated?: (event: GeomanCreateEvent) => void;
  onEdited?: (event: GeomanEditEvent) => void;
  onRemoved?: (event: GeomanRemoveEvent) => void;
  // ... all other event handlers
}
```

#### Return Value

```typescript
interface UseGeomanReturn {
  map: LeafletMap | null;
  featureGroup: Layer | null;
  isDrawing: boolean;
  isEditing: boolean;
  isRemoving: boolean;
  isDragging: boolean;
  isCutting: boolean;
  isRotating: boolean;
  currentMode: string | null;
  
  // Control functions
  enableDraw: (options?: GeomanDrawOptions) => void;
  disableDraw: () => void;
  enableEdit: (options?: GeomanEditOptions) => void;
  disableEdit: () => void;
  enableRemove: () => void;
  disableRemove: () => void;
  enableDrag: () => void;
  disableDrag: () => void;
  enableCut: () => void;
  disableCut: () => void;
  enableRotate: () => void;
  disableRotate: () => void;
  
  // Layer management
  clearLayers: () => void;
  getLayers: () => Layer[];
  addLayer: (layer: Layer) => void;
  removeLayer: (layer: Layer) => void;
  
  // Options management
  updateDrawOptions: (options: GeomanDrawOptions) => void;
  updateEditOptions: (options: GeomanEditOptions) => void;
  updateToolbarOptions: (options: GeomanToolbarOptions) => void;
  updateGlobalOptions: (options: GeomanGlobalOptions) => void;
  
  // Utility functions
  toggleDraw: () => void;
  toggleEdit: () => void;
  toggleRemove: () => void;
  toggleDrag: () => void;
  toggleCut: () => void;
  toggleRotate: () => void;
  
  // Geoman-specific methods
  getGeomanLayers: () => Layer[];
  removeGeomanLayers: () => void;
  toggleGlobalEditMode: () => void;
  toggleGlobalRemovalMode: () => void;
  toggleGlobalDragMode: () => void;
  toggleGlobalCutMode: () => void;
  toggleGlobalRotateMode: () => void;
}
```

#### Usage Example

```tsx
import React from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { useGeoman } from 'react-leaflet-geoman';

// Component that uses the hook inside MapContainer context
const MapWithHookInner = () => {
  const {
    isDrawing,
    isEditing,
    enableDraw,
    disableDraw,
    enableEdit,
    disableEdit,
    clearLayers,
    getLayers,
  } = useGeoman({
    onCreated: (event) => console.log('Created:', event),
    onEdited: (event) => console.log('Edited:', event),
    onRemoved: (event) => console.log('Removed:', event),
  });

  return (
    <div>
      <div className="controls">
        <button onClick={() => isDrawing ? disableDraw() : enableDraw()}>
          {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
        </button>
        <button onClick={() => isEditing ? disableEdit() : enableEdit()}>
          {isEditing ? 'Stop Editing' : 'Start Editing'}
        </button>
        <button onClick={clearLayers}>Clear All</button>
        <span>Layers: {getLayers().length}</span>
      </div>
      
      <FeatureGroup />
    </div>
  );
};

// Main component that provides the MapContainer context
const MapWithHook = () => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapWithHookInner />
    </MapContainer>
  );
};
```

## Types

### Drawing Options

```typescript
interface GeomanDrawOptions {
  marker?: boolean;
  circle?: boolean;
  polygon?: boolean;
  polyline?: boolean;
  rectangle?: boolean;
  circlemarker?: boolean;
  text?: boolean;
  cut?: boolean;
  rotate?: boolean;
  
  // Global drawing options
  templineStyle?: L.PathOptions;
  hintlineStyle?: L.PathOptions;
  cursorMarker?: boolean;
  finishOnDoubleClick?: boolean;
  finishOn?: string | string[];
  snappable?: boolean;
  snapDistance?: number;
  allowSelfIntersection?: boolean;
  drawError?: {
    color?: string;
    timeout?: number;
    message?: string;
  };
}
```

### Editing Options

```typescript
interface GeomanEditOptions {
  edit?: boolean;
  remove?: boolean;
  drag?: boolean;
  cut?: boolean;
  rotate?: boolean;
  
  // Global editing options
  snappable?: boolean;
  snapDistance?: number;
  allowSelfIntersection?: boolean;
  preventMarkerRemoval?: boolean;
  preventVertexEdit?: boolean;
  preventVertexRemoval?: boolean;
  preventVertexAddition?: boolean;
  preventVertexDrag?: boolean;
  preventVertexMove?: boolean;
  preventVertexResize?: boolean;
  preventVertexRotate?: boolean;
  preventVertexCut?: boolean;
}
```

### Toolbar Options

```typescript
interface GeomanToolbarOptions {
  position?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
  
  // Drawing tools
  drawMarker?: boolean;
  drawPolygon?: boolean;
  drawPolyline?: boolean;
  drawCircle?: boolean;
  drawRectangle?: boolean;
  drawCircleMarker?: boolean;
  drawText?: boolean;
  
  // Editing tools
  editMode?: boolean;
  removalMode?: boolean;
  dragMode?: boolean;
  cutMode?: boolean;
  rotateMode?: boolean;
  
  // Customization
  buttonClass?: string;
  buttonClassActive?: string;
  buttonClassInactive?: string;
  buttonClassDisabled?: string;
  
  // Icons and labels
  drawMarkerIcon?: string;
  drawMarkerText?: string;
  // ... other icon and text options
}
```

### Event Types

```typescript
interface GeomanEvent {
  layer: L.Layer;
  layerType: string;
  originalEvent: Event;
  workingLayer?: L.Layer;
  shape?: string;
}

interface GeomanCreateEvent extends GeomanEvent {
  // Additional properties for create events
}

interface GeomanEditEvent extends GeomanEvent {
  // Additional properties for edit events
}

interface GeomanRemoveEvent extends GeomanEvent {
  // Additional properties for remove events
}

interface GeomanDragEvent extends GeomanEvent {
  dragStartLatLng?: L.LatLng;
  dragEndLatLng?: L.LatLng;
}

interface GeomanCutEvent extends GeomanEvent {
  cutLatLngs?: L.LatLng[];
}

interface GeomanRotateEvent extends GeomanEvent {
  rotationAngle?: number;
  rotationCenter?: L.LatLng;
}
```

## Type Guards

The package provides type guards for runtime type checking:

```typescript
// Event type guards
isGeomanCreateEvent(event: any): event is GeomanCreateEvent
isGeomanEditEvent(event: any): event is GeomanEditEvent
isGeomanRemoveEvent(event: any): event is GeomanRemoveEvent
isGeomanDragEvent(event: any): event is GeomanDragEvent
isGeomanCutEvent(event: any): event is GeomanCutEvent
isGeomanRotateEvent(event: any): event is GeomanRotateEvent

// Layer type guards
isGeomanMarker(layer: L.Layer): layer is L.Marker
isGeomanPolygon(layer: L.Layer): layer is L.Polygon
isGeomanPolyline(layer: L.Layer): layer is L.Polyline
isGeomanCircle(layer: L.Layer): layer is L.Circle
isGeomanRectangle(layer: L.Layer): layer is L.Rectangle
isGeomanCircleMarker(layer: L.Layer): layer is L.CircleMarker
```

### Usage Example

```tsx
import { isGeomanCreateEvent, isGeomanMarker } from 'react-leaflet-geoman';

const handleEvent = (event: any) => {
  if (isGeomanCreateEvent(event)) {
    console.log('Created layer:', event.layer);
    
    if (isGeomanMarker(event.layer)) {
      console.log('Created marker at:', event.layer.getLatLng());
    }
  }
};
```

**Note**: Type guards are now exported from the main package and can be imported directly without any import path issues.

## Examples

### Advanced Configuration

```tsx
<LeafletDrawNext
  position="topright"
  draw={{
    marker: true,
    polygon: {
      allowSelfIntersection: false,
      snappable: true,
      snapDistance: 20,
    },
    polyline: {
      templineStyle: { color: 'red' },
      hintlineStyle: { color: 'blue' },
    },
  }}
  edit={{
    edit: true,
    remove: true,
    drag: true,
    snappable: true,
    snapDistance: 15,
  }}
  toolbar={{
    position: 'topleft',
    drawMarker: true,
    drawPolygon: true,
    drawPolyline: true,
    editMode: true,
    removalMode: true,
    buttonClass: 'custom-button',
    buttonClassActive: 'custom-button-active',
  }}
  global={{
    templineStyle: { color: '#f09199', weight: 3 },
    hintlineStyle: { color: '#f09199', weight: 1 },
    cursorMarker: true,
    finishOnDoubleClick: true,
    snappable: true,
    snapDistance: 20,
    allowSelfIntersection: false,
  }}
  onCreated={handleCreated}
  onEdited={handleEdited}
  onRemoved={handleRemoved}
/>
```

### Custom Styling

```tsx
<LeafletDrawNext
  className="custom-draw-control"
  style={{
    backgroundColor: 'white',
    border: '2px solid #ccc',
    borderRadius: '4px',
    padding: '8px',
  }}
  // ... other props
/>
```

### Programmatic Control with Hook

```tsx
const {
  enableDraw,
  disableDraw,
  enableEdit,
  disableEdit,
  clearLayers,
  getLayers,
  updateDrawOptions,
  updateEditOptions,
} = useGeoman({
  draw: { marker: true, polygon: true },
  edit: { edit: true, remove: true },
  onCreated: (event) => {
    console.log('Created:', event.layer);
  },
});

// Programmatically control drawing
const startDrawingMarkers = () => {
  enableDraw({ marker: true });
};

const startDrawingPolygons = () => {
  enableDraw({ polygon: true });
};

const stopDrawing = () => {
  disableDraw();
};

const updateOptions = () => {
  updateDrawOptions({
    marker: true,
    polygon: { allowSelfIntersection: false },
  });
};
```

This API reference covers all the main functionality of the React-Leaflet-Geoman package. For more examples and advanced usage patterns, see the [Examples](./EXAMPLES.md) documentation.