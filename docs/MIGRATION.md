# Migration Guide

This guide helps you migrate from `react-leaflet-draw` or other similar packages to `react-leaflet-geoman`.

## Table of Contents

- [From react-leaflet-draw](#from-react-leaflet-draw)
- [From react-leaflet-draw-next](#from-react-leaflet-draw-next)
- [From vanilla Geoman.io](#from-vanilla-geomanio)
- [From Leaflet.draw](#from-leafletdraw)
- [Breaking Changes](#breaking-changes)
- [Migration Checklist](#migration-checklist)

## From react-leaflet-draw

### Package Installation

**Old:**
```bash
npm install react-leaflet-draw
```

**New:**
```bash
npm install react-leaflet-geoman
npm install @geoman-io/leaflet-geoman-free
```

### Import Changes

**Old:**
```tsx
import { EditControl } from 'react-leaflet-draw';
```

**New:**
```tsx
import { LeafletDrawNext } from 'react-leaflet-geoman';
// Or for backward compatibility
import { EditControl } from 'react-leaflet-geoman';
```

### Component Usage

**Old:**
```tsx
<EditControl
  position="topright"
  onCreated={handleCreated}
  onEdited={handleEdited}
  onDeleted={handleDeleted}
  draw={{
    rectangle: true,
    polygon: true,
    circle: true,
    marker: true,
    polyline: true,
    circlemarker: false,
  }}
  edit={{
    edit: true,
    remove: true,
    poly: {},
    marker: {},
  }}
/>
```

**New:**
```tsx
<LeafletDrawNext
  position="topright"
  onCreated={handleCreated}
  onEdited={handleEdited}
  onRemoved={handleRemoved} // Note: 'onDeleted' → 'onRemoved'
  draw={{
    rectangle: true,
    polygon: true,
    circle: true,
    marker: true,
    polyline: true,
    circlemarker: false,
  }}
  edit={{
    edit: true,
    remove: true,
    drag: true, // New: enable dragging
    cut: true,  // New: enable cutting
    rotate: true, // New: enable rotation
  }}
/>
```

### Event Handler Changes

**Old:**
```tsx
const handleDeleted = (e) => {
  console.log('Deleted:', e);
};
```

**New:**
```tsx
const handleRemoved = (e) => {
  console.log('Removed:', e);
};
```

### Advanced Configuration

**Old:**
```tsx
<EditControl
  position="topright"
  draw={{
    rectangle: {
      shapeOptions: {
        color: '#f09199',
        weight: 3,
      },
    },
    polygon: {
      allowIntersection: false,
      drawError: {
        color: '#e1e100',
        message: '<strong>Oh snap!<strong> you can\'t draw that!',
      },
    },
  }}
  edit={{
    poly: {
      allowIntersection: false,
    },
  }}
/>
```

**New:**
```tsx
<LeafletDrawNext
  position="topright"
  draw={{
    rectangle: {
      templineStyle: { color: '#f09199', weight: 3 },
    },
    polygon: {
      allowSelfIntersection: false,
      drawError: {
        color: '#e1e100',
        message: '<strong>Oh snap!</strong> you can\'t draw that!',
      },
    },
  }}
  edit={{
    edit: true,
    allowSelfIntersection: false,
  }}
  global={{
    templineStyle: { color: '#f09199', weight: 3 },
    allowSelfIntersection: false,
  }}
/>
```

## From react-leaflet-draw-next

### Package Installation

**Old:**
```bash
npm install react-leaflet-draw-next
```

**New:**
```bash
npm install react-leaflet-geoman
npm install @geoman-io/leaflet-geoman-free
```

### Import Changes

**Old:**
```tsx
import { LeafletDrawNext } from 'react-leaflet-draw-next';
```

**New:**
```tsx
import { LeafletDrawNext } from 'react-leaflet-geoman';
```

### Component Usage

The API is very similar, but there are some improvements:

**Old:**
```tsx
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
```

**New (Enhanced):**
```tsx
<LeafletDrawNext
  position="topright"
  onCreated={handleCreated}
  onEdited={handleEdited}
  onRemoved={handleRemoved}
  // New: More specific event handlers
  onDragStart={handleDragStart}
  onDrag={handleDrag}
  onDragEnd={handleDragEnd}
  onCut={handleCut}
  onRotate={handleRotate}
  draw={{
    marker: true,
    circle: true,
    rectangle: true,
    polygon: true,
    polyline: true,
    // New: Enhanced options
    templineStyle: { color: '#f09199', weight: 3 },
    hintlineStyle: { color: '#f09199', weight: 1 },
    cursorMarker: true,
    finishOnDoubleClick: true,
    snappable: true,
    snapDistance: 20,
  }}
  edit={{
    edit: true,
    remove: true,
    // New: Enhanced editing options
    drag: true,
    cut: true,
    rotate: true,
    snappable: true,
    snapDistance: 15,
  }}
  // New: Global options
  global={{
    templineStyle: { color: '#f09199', weight: 3 },
    hintlineStyle: { color: '#f09199', weight: 1 },
    cursorMarker: true,
    finishOnDoubleClick: true,
    snappable: true,
    snapDistance: 20,
    allowSelfIntersection: false,
  }}
/>
```

## From vanilla Geoman.io

### Package Installation

**Old:**
```bash
npm install @geoman-io/leaflet-geoman-free
```

**New:**
```bash
npm install react-leaflet-geoman
npm install @geoman-io/leaflet-geoman-free
```

### Manual Setup

**Old:**
```tsx
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      
      // Enable Geoman
      map.pm.enable();
      
      // Configure options
      map.pm.setDrawOptions({
        marker: true,
        polygon: true,
      });
      
      // Add event listeners
      map.on('pm:create', (e) => {
        console.log('Created:', e);
      });
      
      map.on('pm:edit', (e) => {
        console.log('Edited:', e);
      });
      
      map.on('pm:remove', (e) => {
        console.log('Removed:', e);
      });
    }
  }, []);

  return (
    <MapContainer
      ref={mapRef}
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
```

**New:**
```tsx
import React from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { LeafletDrawNext } from 'react-leaflet-geoman';

const Map = () => {
  const handleCreated = (event) => {
    console.log('Created:', event);
  };

  const handleEdited = (event) => {
    console.log('Edited:', event);
  };

  const handleRemoved = (event) => {
    console.log('Removed:', event);
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
            polygon: true,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};
```

### Using the Hook

**Old (Manual):**
```tsx
const [isDrawing, setIsDrawing] = useState(false);
const [isEditing, setIsEditing] = useState(false);

useEffect(() => {
  if (mapRef.current) {
    const map = mapRef.current;
    
    map.on('pm:globaldrawmodetoggled', (e) => {
      setIsDrawing(e.enabled);
    });
    
    map.on('pm:globaleditmodetoggled', (e) => {
      setIsEditing(e.enabled);
    });
  }
}, []);

const enableDraw = () => {
  if (mapRef.current) {
    mapRef.current.pm.enableDraw('Polygon');
  }
};

const disableDraw = () => {
  if (mapRef.current) {
    mapRef.current.pm.disableDraw();
  }
};
```

**New (Hook):**
```tsx
import { useGeoman } from 'react-leaflet-geoman';

const Map = () => {
  const {
    isDrawing,
    isEditing,
    enableDraw,
    disableDraw,
    enableEdit,
    disableEdit,
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
      </div>
      
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: 'calc(100vh - 60px)', width: '100%' }}
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

## From Leaflet.draw

### Package Installation

**Old:**
```bash
npm install leaflet-draw
```

**New:**
```bash
npm install react-leaflet-geoman
npm install @geoman-io/leaflet-geoman-free
```

### Manual Setup

**Old:**
```tsx
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';

const Map = () => {
  const mapRef = useRef(null);
  const featureGroupRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      const featureGroup = L.featureGroup();
      featureGroupRef.current = featureGroup;
      
      map.addLayer(featureGroup);
      
      const drawControl = new L.Control.Draw({
        position: 'topright',
        draw: {
          marker: true,
          circle: true,
          rectangle: true,
          polygon: true,
          polyline: true,
        },
        edit: {
          featureGroup: featureGroup,
          remove: true,
        },
      });
      
      map.addControl(drawControl);
      
      map.on(L.Draw.Event.CREATED, (e) => {
        const layer = e.layer;
        featureGroup.addLayer(layer);
      });
      
      map.on(L.Draw.Event.EDITED, (e) => {
        console.log('Edited:', e);
      });
      
      map.on(L.Draw.Event.DELETED, (e) => {
        console.log('Deleted:', e);
      });
    }
  }, []);

  return (
    <MapContainer
      ref={mapRef}
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
```

**New:**
```tsx
import React from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { LeafletDrawNext } from 'react-leaflet-geoman';

const Map = () => {
  const handleCreated = (event) => {
    console.log('Created:', event);
  };

  const handleEdited = (event) => {
    console.log('Edited:', event);
  };

  const handleRemoved = (event) => {
    console.log('Removed:', event);
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
```

## Breaking Changes

### Event Names

| Old | New |
|-----|-----|
| `onDeleted` | `onRemoved` |
| `L.Draw.Event.CREATED` | `pm:create` |
| `L.Draw.Event.EDITED` | `pm:edit` |
| `L.Draw.Event.DELETED` | `pm:remove` |

### Option Names

| Old | New |
|-----|-----|
| `allowIntersection` | `allowSelfIntersection` |
| `shapeOptions` | `templineStyle` / `hintlineStyle` |
| `poly` | `edit` (with different structure) |

### CSS Classes

| Old | New |
|-----|-----|
| `leaflet-draw-toolbar` | `leaflet-pm-toolbar` |
| `leaflet-draw-edit-edit` | `leaflet-pm-icon-edit` |
| `leaflet-draw-edit-remove` | `leaflet-pm-icon-delete` |

## Migration Checklist

### ✅ Pre-Migration

- [ ] Backup your current code
- [ ] Note down all current configurations
- [ ] List all event handlers in use
- [ ] Document any custom styling

### ✅ Package Updates

- [ ] Uninstall old package: `npm uninstall react-leaflet-draw`
- [ ] Install new package: `npm install react-leaflet-geoman`
- [ ] Install peer dependency: `npm install @geoman-io/leaflet-geoman-free`
- [ ] Update CSS imports

### ✅ Code Updates

- [ ] Update import statements
- [ ] Replace component names (`EditControl` → `LeafletDrawNext`)
- [ ] Update event handler names (`onDeleted` → `onRemoved`)
- [ ] Update option structures
- [ ] Test all functionality

### ✅ Post-Migration

- [ ] Test all drawing tools
- [ ] Test all editing tools
- [ ] Verify event handlers work
- [ ] Check styling and appearance
- [ ] Test in different browsers
- [ ] Update documentation

### ✅ Advanced Features

- [ ] Explore new features (cut, rotate, drag)
- [ ] Test new event handlers
- [ ] Try the `useGeoman` hook
- [ ] Experiment with new options
- [ ] Optimize performance if needed

## Need Help?

If you encounter issues during migration:

1. Check the [Troubleshooting](./TROUBLESHOOTING.md) guide
2. Review the [API Reference](./API.md) for new features
3. Look at the [Examples](./EXAMPLES.md) for working code
4. Open an issue on GitHub with your specific problem

The migration should be straightforward for most use cases, and you'll gain access to many new features and improvements!