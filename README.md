# React-Leaflet-Geoman

Modern React component for Leaflet map drawing and editing using [Geoman.io](https://geoman.io), with full TypeScript support and React 19 compatibility.

## 🚀 Features

- **Modern Geoman Integration**: Built on top of the latest Geoman.io library
- **Full TypeScript Support**: Complete type coverage for all events and options
- **React 19 Compatible**: Works with the latest React versions
- **Custom Hook**: `useGeoman` hook for programmatic control
- **Tree-shakeable**: Optimized bundle size with ESM exports
- **SSR Compatible**: No window/DOM access at import time
- **Comprehensive Events**: All Geoman events supported with proper typing
- **Customizable Toolbar**: Full control over drawing and editing tools
- **Feature Group Support**: Organized layer management
- **Accessibility**: Keyboard navigation and ARIA labels support

## 📦 Installation

```bash
npm install react-leaflet-geoman
```

### Peer Dependencies

Make sure you have these installed:

```bash
npm install leaflet react-leaflet @geoman-io/leaflet-geoman-free
npm install -D @types/leaflet
```

## 🎯 Quick Start

### Basic Usage

```tsx
import React from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { LeafletDrawNext } from 'react-leaflet-geoman';

const App = () => {
  const handleCreated = (event) => {
    console.log('Layer created:', event);
  };

  const handleEdited = (event) => {
    console.log('Layer edited:', event);
  };

  const handleRemoved = (event) => {
    console.log('Layer removed:', event);
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
      </FeatureGroup>
    </MapContainer>
  );
};

export default App;
```

### Using the Custom Hook

```tsx
import React from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { useGeoman } from 'react-leaflet-geoman';

const MapWithHook = () => {
  const {
    isDrawing,
    isEditing,
    isRemoving,
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
        <button onClick={enableDraw} disabled={isDrawing}>
          Start Drawing
        </button>
        <button onClick={disableDraw} disabled={!isDrawing}>
          Stop Drawing
        </button>
        <button onClick={enableEdit} disabled={isEditing}>
          Start Editing
        </button>
        <button onClick={disableEdit} disabled={!isEditing}>
          Stop Editing
        </button>
        <button onClick={clearLayers}>
          Clear All ({getLayers().length})
        </button>
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
```

## 📚 API Reference

### LeafletDrawNext Component

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `position` | `ControlPosition` | Position of the toolbar ('topright', 'topleft', 'bottomright', 'bottomleft') |
| `draw` | `GeomanDrawOptions` | Drawing options for different shapes |
| `edit` | `GeomanEditOptions` | Editing options for layers |
| `toolbar` | `GeomanToolbarOptions` | Toolbar configuration |
| `featureGroup` | `Layer` | Feature group to manage drawn layers |
| `onCreated` | `(event: GeomanCreateEvent) => void` | Called when a layer is created |
| `onEdited` | `(event: GeomanEditEvent) => void` | Called when a layer is edited |
| `onRemoved` | `(event: GeomanRemoveEvent) => void` | Called when a layer is removed |
| `onDragStart` | `(event: GeomanEvent) => void` | Called when dragging starts |
| `onDrag` | `(event: GeomanEvent) => void` | Called during dragging |
| `onDragEnd` | `(event: GeomanEvent) => void` | Called when dragging ends |
| `onCut` | `(event: GeomanEvent) => void` | Called when a layer is cut |
| `onRotate` | `(event: GeomanEvent) => void` | Called when a layer is rotated |

#### Drawing Events

| Event | Description |
|-------|-------------|
| `onDrawStart` | Called when drawing starts |
| `onDrawStop` | Called when drawing stops |
| `onDrawVertex` | Called when a vertex is added during drawing |

#### Editing Events

| Event | Description |
|-------|-------------|
| `onEditStart` | Called when editing starts |
| `onEditStop` | Called when editing stops |
| `onEditVertex` | Called when a vertex is edited |
| `onEditMove` | Called when a layer is moved during editing |
| `onEditResize` | Called when a layer is resized during editing |

#### Removal Events

| Event | Description |
|-------|-------------|
| `onRemoveStart` | Called when removal mode is activated |
| `onRemoveStop` | Called when removal mode is deactivated |

#### Global Mode Events

| Event | Description |
|-------|-------------|
| `onGlobalDrawModeToggled` | Called when global draw mode is toggled |
| `onGlobalDragModeToggled` | Called when global drag mode is toggled |
| `onGlobalRemovalModeToggled` | Called when global removal mode is toggled |
| `onGlobalCutModeToggled` | Called when global cut mode is toggled |
| `onGlobalRotateModeToggled` | Called when global rotate mode is toggled |

### useGeoman Hook

#### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `map` | `Map \| null` | The Leaflet map instance |
| `featureGroup` | `Layer \| null` | The feature group for layers |
| `isDrawing` | `boolean` | Whether drawing mode is active |
| `isEditing` | `boolean` | Whether editing mode is active |
| `isRemoving` | `boolean` | Whether removal mode is active |
| `isDragging` | `boolean` | Whether drag mode is active |
| `isCutting` | `boolean` | Whether cut mode is active |
| `isRotating` | `boolean` | Whether rotate mode is active |
| `currentMode` | `string \| null` | Current active mode |

#### Control Functions

| Function | Description |
|----------|-------------|
| `enableDraw()` | Enable drawing mode |
| `disableDraw()` | Disable drawing mode |
| `enableEdit()` | Enable editing mode |
| `disableEdit()` | Disable editing mode |
| `enableRemove()` | Enable removal mode |
| `disableRemove()` | Disable removal mode |
| `enableDrag()` | Enable drag mode |
| `disableDrag()` | Disable drag mode |
| `enableCut()` | Enable cut mode |
| `disableCut()` | Disable cut mode |
| `enableRotate()` | Enable rotate mode |
| `disableRotate()` | Disable rotate mode |

#### Layer Management

| Function | Description |
|----------|-------------|
| `clearLayers()` | Remove all layers from the feature group |
| `getLayers()` | Get all layers in the feature group |
| `addLayer(layer)` | Add a layer to the feature group |
| `removeLayer(layer)` | Remove a layer from the feature group |

#### Options Management

| Function | Description |
|----------|-------------|
| `updateDrawOptions(options)` | Update drawing options |
| `updateEditOptions(options)` | Update editing options |
| `updateToolbarOptions(options)` | Update toolbar options |

#### Toggle Functions

| Function | Description |
|----------|-------------|
| `toggleDraw()` | Toggle drawing mode |
| `toggleEdit()` | Toggle editing mode |
| `toggleRemove()` | Toggle removal mode |
| `toggleDrag()` | Toggle drag mode |
| `toggleCut()` | Toggle cut mode |
| `toggleRotate()` | Toggle rotate mode |

## 🔧 Configuration

### Draw Options

```tsx
const drawOptions = {
  marker: {
    icon: L.divIcon({ className: 'custom-marker' }),
    draggable: true,
  },
  circle: {
    radius: 1000,
    color: '#ff0000',
    fillColor: '#ff0000',
    fillOpacity: 0.3,
  },
  polygon: {
    color: '#0000ff',
    fillColor: '#0000ff',
    fillOpacity: 0.3,
    allowIntersection: false,
  },
  polyline: {
    color: '#00ff00',
    weight: 3,
  },
  rectangle: {
    color: '#ff00ff',
    fillColor: '#ff00ff',
    fillOpacity: 0.3,
  },
  circlemarker: {
    radius: 10,
    color: '#ffff00',
    fillColor: '#ffff00',
    fillOpacity: 0.7,
  },
  text: {
    text: 'Sample Text',
    icon: L.divIcon({ className: 'custom-text-icon' }),
  },
};
```

### Edit Options

```tsx
const editOptions = {
  edit: {
    selectedPathOptions: {
      color: '#ff0000',
      fillColor: '#ff0000',
      fillOpacity: 0.3,
    },
    allowIntersection: false,
    preventMarkerRemoval: false,
    preventVertexEdit: false,
  },
  remove: {
    preventMarkerRemoval: false,
  },
  drag: {
    draggable: true,
  },
  cut: {
    snappable: true,
    snapDistance: 20,
    allowIntersection: false,
  },
  rotate: {
    rotateAngle: 45,
  },
};
```

### Toolbar Options

```tsx
const toolbarOptions = {
  position: 'topright',
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
  oneBlock: false,
  drawTextInOneBlock: false,
  editInOneBlock: false,
};
```

## 🔄 Migration from react-leaflet-draw

If you're migrating from `react-leaflet-draw`, here are the key changes:

### Before (react-leaflet-draw)

```tsx
import { EditControl } from 'react-leaflet-draw';

<EditControl
  position="topright"
  onCreated={handleCreated}
  onEdited={handleEdited}
  onDeleted={handleDeleted}
  draw={{
    rectangle: false,
  }}
  edit={{
    edit: true,
    remove: true,
  }}
/>
```

### After (react-leaflet-geoman)

```tsx
import { LeafletDrawNext } from 'react-leaflet-geoman';

<LeafletDrawNext
  position="topright"
  onCreated={handleCreated}
  onEdited={handleEdited}
  onRemoved={handleDeleted} // Note: onDeleted -> onRemoved
  draw={{
    rectangle: false,
  }}
  edit={{
    edit: true,
    remove: true,
  }}
/>
```

### Key Changes

1. **Import**: `EditControl` → `LeafletDrawNext`
2. **Event names**: `onDeleted` → `onRemoved`
3. **Additional events**: More comprehensive event system
4. **Better TypeScript support**: Full type coverage
5. **Custom hook**: `useGeoman` for programmatic control

## 🎨 Styling

### CSS Import

Make sure to import the Geoman CSS:

```tsx
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
```

### Custom Styling

You can customize the toolbar appearance:

```css
/* Custom toolbar styling */
.leaflet-pm-toolbar {
  background: #ffffff;
  border: 2px solid #cccccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.leaflet-pm-toolbar .leaflet-pm-icon {
  background-color: #007bff;
  color: white;
}

.leaflet-pm-toolbar .leaflet-pm-icon:hover {
  background-color: #0056b3;
}

.leaflet-pm-toolbar .leaflet-pm-icon.active {
  background-color: #28a745;
}
```

## 🧪 Testing

```tsx
import { render, screen } from '@testing-library/react';
import { LeafletDrawNext } from 'react-leaflet-geoman';

// Mock Leaflet and Geoman
jest.mock('leaflet');
jest.mock('@geoman-io/leaflet-geoman-free');

test('renders LeafletDrawNext component', () => {
  render(
    <MapContainer center={[0, 0]} zoom={10}>
      <LeafletDrawNext position="topright" />
    </MapContainer>
  );
  
  // Add your assertions here
});
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/your-username/react-leaflet-geoman.git
cd react-leaflet-geoman
npm install
npm run dev
```

### Running Tests

```bash
npm test
npm run test:coverage
```

### Building

```bash
npm run build
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Geoman.io](https://geoman.io) for the excellent drawing library
- [React-Leaflet](https://react-leaflet.js.org) for the React integration
- [Leaflet](https://leafletjs.com) for the mapping library

## 📞 Support

- 📖 [Documentation](https://github.com/your-username/react-leaflet-geoman)
- 🐛 [Issues](https://github.com/your-username/react-leaflet-geoman/issues)
- 💬 [Discussions](https://github.com/your-username/react-leaflet-geoman/discussions)

---

Made with ❤️ by the React-Leaflet-Geoman community
