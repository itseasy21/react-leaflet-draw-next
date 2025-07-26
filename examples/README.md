# React-Leaflet-Geoman Examples

This directory contains example applications demonstrating how to use React-Leaflet-Geoman.

## 📁 Examples

### React App Example (`react-app/`)

A complete React application built with Vite that demonstrates:

- **Component Usage**: How to use the `LeafletDrawNext` component
- **Hook Usage**: How to use the `useGeoman` custom hook
- **Event Handling**: Examples of all available events
- **Configuration**: How to customize drawing and editing options
- **State Management**: Real-time state tracking and layer management

#### Features Demonstrated

- ✅ Basic map setup with OpenStreetMap tiles
- ✅ Drawing tools (marker, circle, rectangle, polygon, polyline, circlemarker, text)
- ✅ Editing tools (edit, remove, drag, cut, rotate)
- ✅ Event handling for all Geoman events
- ✅ Programmatic control using the `useGeoman` hook
- ✅ Layer management (add, remove, clear, count)
- ✅ Real-time state tracking
- ✅ Responsive design
- ✅ Modern UI with custom styling

#### Getting Started

**Option 1: Using the setup script (recommended)**
```bash
cd examples
./setup.sh
```

**Option 2: Manual setup**
```bash
cd examples/react-app
npm install
npm run dev
```

The example app will open at `http://localhost:3000` and show two tabs:
1. **Component Example**: Using the `LeafletDrawNext` component
2. **Hook Example**: Using the `useGeoman` custom hook

## 🚀 Running Examples

### Prerequisites

Make sure you have the following installed:
- Node.js 18+
- npm 8+
- React 19 (automatically installed)

### Quick Start

1. **Install dependencies** (from the root directory):
   ```bash
   npm install
   ```

2. **Run the React example**:
   ```bash
   npm run example:dev
   ```

3. **Build the React example**:
   ```bash
   npm run example:build
   ```

## 📚 Example Code Snippets

### Basic Component Usage

```tsx
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { LeafletDrawNext } from 'react-leaflet-geoman';

const App = () => (
  <MapContainer center={[51.505, -0.09]} zoom={13}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <FeatureGroup>
      <LeafletDrawNext
        position="topright"
        onCreated={(event) => console.log('Created:', event)}
        onEdited={(event) => console.log('Edited:', event)}
        onRemoved={(event) => console.log('Removed:', event)}
      />
    </FeatureGroup>
  </MapContainer>
);
```

### Using the Custom Hook

```tsx
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { useGeoman } from 'react-leaflet-geoman';

const MapWithHook = () => {
  const {
    isDrawing,
    isEditing,
    enableDraw,
    disableDraw,
    clearLayers,
    getLayers,
  } = useGeoman({
    onCreated: (event) => console.log('Created:', event),
  });

  return (
    <div>
      <button onClick={enableDraw} disabled={isDrawing}>
        Start Drawing
      </button>
      <button onClick={disableDraw} disabled={!isDrawing}>
        Stop Drawing
      </button>
      <button onClick={clearLayers}>
        Clear All ({getLayers().length})
      </button>
      
      <MapContainer center={[51.505, -0.09]} zoom={13}>
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

## 🎨 Customization Examples

### Custom Drawing Options

```tsx
<LeafletDrawNext
  draw={{
    marker: {
      icon: L.divIcon({ className: 'custom-marker' }),
      draggable: true,
    },
    polygon: {
      color: '#ff0000',
      fillColor: '#ff0000',
      fillOpacity: 0.3,
      allowIntersection: false,
    },
    circle: {
      radius: 1000,
      color: '#00ff00',
      fillColor: '#00ff00',
      fillOpacity: 0.3,
    },
  }}
/>
```

### Custom Toolbar Configuration

```tsx
<LeafletDrawNext
  toolbar={{
    position: 'topleft',
    drawMarker: true,
    drawPolygon: true,
    drawCircle: true,
    editMode: true,
    removalMode: true,
    oneBlock: true,
  }}
/>
```

### Event Handling

```tsx
<LeafletDrawNext
  onCreated={(event) => {
    console.log('Layer created:', event.layer);
    console.log('Layer type:', event.layerType);
  }}
  onEdited={(event) => {
    console.log('Layer edited:', event.layer);
  }}
  onRemoved={(event) => {
    console.log('Layer removed:', event.layer);
  }}
  onDragStart={(event) => {
    console.log('Drag started:', event.layer);
  }}
  onCut={(event) => {
    console.log('Layer cut:', event.layer);
  }}
  onRotate={(event) => {
    console.log('Layer rotated:', event.layer, 'Angle:', event.angle);
  }}
/>
```

## 🔧 Development

### Adding New Examples

To add a new example:

1. Create a new directory in `examples/`
2. Add a `package.json` with necessary dependencies
3. Create your example application
4. Update this README with documentation
5. Add build scripts to the root `package.json`

### Example Structure

```
examples/
├── README.md              # This file
├── react-app/             # React example with Vite
│   ├── package.json
│   ├── src/
│   │   ├── App.tsx
│   │   └── App.css
│   ├── vite.config.ts
│   └── index.html
└── [future-examples]/     # Additional examples
```

## 📖 Additional Resources

- [Main Documentation](../README.md)
- [API Reference](../README.md#api-reference)
- [Migration Guide](../README.md#migration-from-react-leaflet-draw)
- [Geoman.io Documentation](https://geoman.io/docs)
- [React-Leaflet Documentation](https://react-leaflet.js.org/)

## 🤝 Contributing

If you'd like to add an example or improve existing ones:

1. Fork the repository
2. Create a feature branch
3. Add your example
4. Update this README
5. Submit a pull request

See the main [CONTRIBUTING.md](../CONTRIBUTING.md) for more details.