# Getting Started with React-Leaflet-Geoman

This guide will help you get started with React-Leaflet-Geoman, a modern React component for Leaflet map drawing and editing using Geoman.io.

## Table of Contents

- [Installation](#installation)
- [Basic Setup](#basic-setup)
- [First Map](#first-map)
- [Adding Drawing Tools](#adding-drawing-tools)
- [Handling Events](#handling-events)
- [Using the Hook](#using-the-hook)
- [Next Steps](#next-steps)

## Installation

### Prerequisites

Make sure you have the following installed:
- Node.js (version 18 or higher)
- npm or yarn
- A React project (Create React App, Next.js, Vite, etc.)

### Install Dependencies

```bash
# Install the main package
npm install react-leaflet-geoman

# Install peer dependencies
npm install leaflet react-leaflet @geoman-io/leaflet-geoman-free

# Install TypeScript types (if using TypeScript)
npm install -D @types/leaflet
```

### Import CSS

Add the required CSS to your project:

```tsx
// In your main App component or entry file
import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
```

## Basic Setup

### 1. Create a Basic Map

First, let's create a simple map with React-Leaflet:

```tsx
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const App = () => {
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
    </MapContainer>
  );
};

export default App;
```

### 2. Add the Drawing Component

Now let's add the LeafletDrawNext component:

```tsx
import React from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { LeafletDrawNext } from 'react-leaflet-geoman';
import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

const App = () => {
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
          draw={{
            marker: true,
            circle: true,
            rectangle: true,
            polygon: true,
            polyline: true,
          }}
          edit={{
            edit: true,
            remove: true,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};

export default App;
```

## First Map

Your first map should now have drawing tools! You can:

1. **Draw markers**: Click the marker tool and click on the map
2. **Draw circles**: Click the circle tool, click to set center, drag to set radius
3. **Draw rectangles**: Click the rectangle tool, click and drag to create a rectangle
4. **Draw polygons**: Click the polygon tool, click to add vertices, double-click to finish
5. **Draw polylines**: Click the polyline tool, click to add points, double-click to finish
6. **Edit shapes**: Click the edit tool, then click on shapes to edit them
7. **Remove shapes**: Click the remove tool, then click on shapes to delete them

## Adding Drawing Tools

### Enable/Disable Specific Tools

You can control which drawing tools are available:

```tsx
<LeafletDrawNext
  position="topright"
  draw={{
    marker: true,      // Enable marker drawing
    circle: false,     // Disable circle drawing
    rectangle: true,   // Enable rectangle drawing
    polygon: true,     // Enable polygon drawing
    polyline: false,   // Disable polyline drawing
    circlemarker: true, // Enable circle marker drawing
    text: true,        // Enable text drawing
  }}
  edit={{
    edit: true,        // Enable editing
    remove: true,      // Enable removal
    drag: true,        // Enable dragging
    cut: false,        // Disable cutting
    rotate: true,      // Enable rotation
  }}
/>
```

### Customize Toolbar

You can customize the toolbar appearance and position:

```tsx
<LeafletDrawNext
  position="topright"
  toolbar={{
    position: 'topleft',
    drawMarker: true,
    drawPolygon: true,
    drawPolyline: true,
    drawCircle: true,
    drawRectangle: true,
    editMode: true,
    removalMode: true,
    dragMode: true,
    cutMode: true,
    rotateMode: true,
  }}
  // ... other props
/>
```

## Handling Events

### Basic Event Handling

Add event handlers to respond to user actions:

```tsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { LeafletDrawNext } from 'react-leaflet-geoman';

const App = () => {
  const [layers, setLayers] = useState([]);

  const handleCreated = (event) => {
    console.log('Layer created:', event);
    setLayers(prev => [...prev, event.layer]);
  };

  const handleEdited = (event) => {
    console.log('Layer edited:', event);
  };

  const handleRemoved = (event) => {
    console.log('Layer removed:', event);
    setLayers(prev => prev.filter(layer => layer !== event.layer));
  };

  return (
    <div>
      <div style={{ padding: '10px', background: '#f0f0f0' }}>
        <h3>Map Drawing Demo</h3>
        <p>Layers drawn: {layers.length}</p>
        <p>Use the toolbar on the top-right to draw shapes!</p>
      </div>
      
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: 'calc(100vh - 100px)', width: '100%' }}
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
            }}
            edit={{
              edit: true,
              remove: true,
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default App;
```

### Advanced Event Handling

You can handle more specific events:

```tsx
<LeafletDrawNext
  position="topright"
  onCreated={handleCreated}
  onEdited={handleEdited}
  onRemoved={handleRemoved}
  onDragStart={(event) => console.log('Drag started:', event)}
  onDrag={(event) => console.log('Dragging:', event)}
  onDragEnd={(event) => console.log('Drag ended:', event)}
  onCut={(event) => console.log('Shape cut:', event)}
  onRotate={(event) => console.log('Shape rotated:', event)}
  onDrawStart={(event) => console.log('Drawing started:', event)}
  onDrawStop={(event) => console.log('Drawing stopped:', event)}
  onDrawVertex={(event) => console.log('Vertex added:', event)}
  onEditStart={(event) => console.log('Editing started:', event)}
  onEditStop={(event) => console.log('Editing stopped:', event)}
  onEditVertex={(event) => console.log('Vertex edited:', event)}
  onEditMove={(event) => console.log('Shape moved:', event)}
  onEditResize={(event) => console.log('Shape resized:', event)}
  onRemoveStart={(event) => console.log('Removal started:', event)}
  onRemoveStop={(event) => console.log('Removal stopped:', event)}
/>
```

## Using the Hook

### Basic Hook Usage

For more programmatic control, use the `useGeoman` hook:

```tsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { useGeoman } from 'react-leaflet-geoman';

const MapWithHook = () => {
  const [layers, setLayers] = useState([]);
  
  const {
    isDrawing,
    isEditing,
    isRemoving,
    currentMode,
    enableDraw,
    disableDraw,
    enableEdit,
    disableEdit,
    clearLayers,
    getLayers,
  } = useGeoman({
    onCreated: (event) => {
      console.log('Created:', event);
      setLayers(prev => [...prev, event.layer]);
    },
    onEdited: (event) => console.log('Edited:', event),
    onRemoved: (event) => {
      console.log('Removed:', event);
      setLayers(prev => prev.filter(layer => layer !== event.layer));
    },
  });

  return (
    <div>
      <div className="controls" style={{ padding: '10px', background: '#f0f0f0' }}>
        <h3>Programmatic Control</h3>
        <div style={{ marginBottom: '10px' }}>
          <button 
            onClick={() => isDrawing ? disableDraw() : enableDraw()}
            style={{ marginRight: '10px' }}
          >
            {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
          </button>
          <button 
            onClick={() => isEditing ? disableEdit() : enableEdit()}
            style={{ marginRight: '10px' }}
          >
            {isEditing ? 'Stop Editing' : 'Start Editing'}
          </button>
          <button onClick={clearLayers}>Clear All</button>
        </div>
        <div>
          <strong>Status:</strong> {currentMode || 'idle'} | 
          <strong>Layers:</strong> {getLayers().length}
        </div>
      </div>
      
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: 'calc(100vh - 120px)', width: '100%' }}
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

export default MapWithHook;
```

### Advanced Hook Features

The hook provides many more features:

```tsx
const {
  // State
  isDrawing, isEditing, isRemoving, isDragging, isCutting, isRotating,
  currentMode, map, featureGroup,
  
  // Control functions
  enableDraw, disableDraw, enableEdit, disableEdit,
  enableRemove, disableRemove, enableDrag, disableDrag,
  enableCut, disableCut, enableRotate, disableRotate,
  
  // Layer management
  clearLayers, getLayers, addLayer, removeLayer,
  
  // Options management
  updateDrawOptions, updateEditOptions, updateToolbarOptions, updateGlobalOptions,
  
  // Utility functions
  toggleDraw, toggleEdit, toggleRemove, toggleDrag, toggleCut, toggleRotate,
  
  // Geoman-specific methods
  getGeomanLayers, removeGeomanLayers,
  toggleGlobalEditMode, toggleGlobalRemovalMode, toggleGlobalDragMode,
  toggleGlobalCutMode, toggleGlobalRotateMode,
} = useGeoman({
  // ... options
});
```

## Next Steps

Now that you have the basics working, you can explore:

1. **Advanced Configuration**: See the [API Reference](./API.md) for all available options
2. **Custom Styling**: Learn how to customize the appearance of the toolbar and shapes
3. **Integration Examples**: Check out the [Examples](./EXAMPLES.md) for more complex use cases
4. **TypeScript**: If you're using TypeScript, explore the comprehensive type definitions
5. **Performance**: Learn about optimization techniques for large datasets

### Common Next Steps

- **Save/Load Shapes**: Implement persistence for drawn shapes
- **Custom Validation**: Add validation rules for drawn shapes
- **Integration with Backend**: Send drawn shapes to your server
- **Custom Toolbar**: Create your own custom drawing controls
- **Advanced Styling**: Customize the appearance of shapes and controls

### Troubleshooting

If you encounter issues:

1. **Check Console**: Look for JavaScript errors in the browser console
2. **Verify Dependencies**: Ensure all peer dependencies are installed
3. **CSS Issues**: Make sure Leaflet and Geoman CSS are imported
4. **TypeScript**: If using TypeScript, check that types are properly imported
5. **React Version**: Ensure you're using React 19 or compatible version

For more help, see the [Troubleshooting](./TROUBLESHOOTING.md) guide or check the [Examples](./EXAMPLES.md) for working code samples.