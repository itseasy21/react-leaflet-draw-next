import React, { useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup, Circle } from 'react-leaflet';
import { LeafletDrawNext, useGeoman } from 'react-leaflet-geoman';
import type { GeomanCreateEvent, GeomanEditEvent, GeomanRemoveEvent } from 'react-leaflet-geoman';
import './App.css';

// Example component using the LeafletDrawNext component
const MapWithComponent = () => {
  const [layers, setLayers] = useState<any[]>([]);

  const handleCreated = (event: GeomanCreateEvent) => {
    console.log('Layer created:', event);
    setLayers(prev => [...prev, event.layer]);
  };

  const handleEdited = (event: GeomanEditEvent) => {
    console.log('Layer edited:', event);
  };

  const handleRemoved = (event: GeomanRemoveEvent) => {
    console.log('Layer removed:', event);
    setLayers(prev => prev.filter(layer => layer !== event.layer));
  };

  return (
    <div className="map-container">
      <h2>Using LeafletDrawNext Component</h2>
      <p>Layers drawn: {layers.length}</p>
      
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup>
          <LeafletDrawNext
            position="topright"
            onCreated={handleCreated}
            onEdited={handleEdited}
            onRemoved={handleRemoved}
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
            toolbar={{
              drawMarker: true,
              drawCircleMarker: true,
              drawPolyline: true,
              drawRectangle: true,
              drawPolygon: true,
              drawCircle: true,
              drawText: true,
              editMode: true,
              dragMode: true,
              cutPolygon: true,
              removalMode: true,
              rotateMode: true,
            }}
          />
          {/* Example existing layer */}
          <Circle center={[51.51, -0.06]} radius={200} />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

// Example component using the useGeoman hook
const MapWithHook = () => {
  const {
    isDrawing,
    isEditing,
    isRemoving,
    isDragging,
    isCutting,
    isRotating,
    currentMode,
    enableDraw,
    disableDraw,
    enableEdit,
    disableEdit,
    enableRemove,
    disableRemove,
    enableDrag,
    disableDrag,
    enableCut,
    disableCut,
    enableRotate,
    disableRotate,
    clearLayers,
    getLayers,
  } = useGeoman({
    onCreated: (event) => console.log('Created:', event),
    onEdited: (event) => console.log('Edited:', event),
    onRemoved: (event) => console.log('Removed:', event),
  });

  return (
    <div className="map-container">
      <h2>Using useGeoman Hook</h2>
      
      <div className="controls">
        <div className="control-group">
          <h3>Drawing</h3>
          <button onClick={enableDraw} disabled={isDrawing}>
            Start Drawing
          </button>
          <button onClick={disableDraw} disabled={!isDrawing}>
            Stop Drawing
          </button>
        </div>
        
        <div className="control-group">
          <h3>Editing</h3>
          <button onClick={enableEdit} disabled={isEditing}>
            Start Editing
          </button>
          <button onClick={disableEdit} disabled={!isEditing}>
            Stop Editing
          </button>
        </div>
        
        <div className="control-group">
          <h3>Removal</h3>
          <button onClick={enableRemove} disabled={isRemoving}>
            Start Removal
          </button>
          <button onClick={disableRemove} disabled={!isRemoving}>
            Stop Removal
          </button>
        </div>
        
        <div className="control-group">
          <h3>Drag</h3>
          <button onClick={enableDrag} disabled={isDragging}>
            Start Drag
          </button>
          <button onClick={disableDrag} disabled={!isDragging}>
            Stop Drag
          </button>
        </div>
        
        <div className="control-group">
          <h3>Cut</h3>
          <button onClick={enableCut} disabled={isCutting}>
            Start Cut
          </button>
          <button onClick={disableCut} disabled={!isCutting}>
            Stop Cut
          </button>
        </div>
        
        <div className="control-group">
          <h3>Rotate</h3>
          <button onClick={enableRotate} disabled={isRotating}>
            Start Rotate
          </button>
          <button onClick={disableRotate} disabled={!isRotating}>
            Stop Rotate
          </button>
        </div>
        
        <div className="control-group">
          <h3>Layers</h3>
          <button onClick={clearLayers}>
            Clear All ({getLayers().length})
          </button>
        </div>
      </div>
      
      <div className="status">
        <p>Current Mode: {currentMode || 'None'}</p>
        <p>Drawing: {isDrawing ? 'Yes' : 'No'}</p>
        <p>Editing: {isEditing ? 'Yes' : 'No'}</p>
        <p>Removing: {isRemoving ? 'Yes' : 'No'}</p>
        <p>Dragging: {isDragging ? 'Yes' : 'No'}</p>
        <p>Cutting: {isCutting ? 'Yes' : 'No'}</p>
        <p>Rotating: {isRotating ? 'Yes' : 'No'}</p>
      </div>
      
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup />
      </MapContainer>
    </div>
  );
};

function App() {
  const [activeExample, setActiveExample] = useState<'component' | 'hook'>('component');

  return (
    <div className="App">
      <header className="App-header">
        <h1>React-Leaflet-Geoman Examples</h1>
        <p>Modern React component for Leaflet map drawing and editing using Geoman.io</p>
      </header>
      
      <nav className="example-nav">
        <button 
          onClick={() => setActiveExample('component')}
          className={activeExample === 'component' ? 'active' : ''}
        >
          Component Example
        </button>
        <button 
          onClick={() => setActiveExample('hook')}
          className={activeExample === 'hook' ? 'active' : ''}
        >
          Hook Example
        </button>
      </nav>
      
      <main className="example-content">
        {activeExample === 'component' ? <MapWithComponent /> : <MapWithHook />}
      </main>
      
      <footer className="App-footer">
        <p>
          Built with ❤️ using{' '}
          <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            React
          </a>
          ,{' '}
          <a href="https://leafletjs.com" target="_blank" rel="noopener noreferrer">
            Leaflet
          </a>
          , and{' '}
          <a href="https://geoman.io" target="_blank" rel="noopener noreferrer">
            Geoman.io
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;