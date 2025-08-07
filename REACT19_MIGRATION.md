# React 19 Migration Guide for react-leaflet-draw

## Overview

This document outlines the changes made to make `react-leaflet-draw` compatible with React 19, addressing the breaking changes and improving the overall code quality.

## Changes Made

### 1. Removed PropTypes (React 19 Breaking Change)

**Issue**: React 19 removes PropTypes from the React package.

**Solution**: Removed all PropTypes definitions from `EditControl.js`. TypeScript definitions in `index.d.ts` provide type safety for TypeScript users.

### 2. Fixed Event Handler Memory Leaks

**Issue**: The original implementation had potential memory leaks where event handlers were not properly cleaned up.

**Changes**:
- Created a `Map` to track event handlers for proper cleanup
- Ensured all event listeners are removed in the cleanup function
- Fixed the cleanup to properly remove the draw control

### 3. Improved useEffect Dependencies

**Issue**: Missing dependencies in useEffect could cause stale closures and React warnings.

**Changes**:
- Added `useCallback` for `onDrawCreate` to prevent unnecessary re-renders
- Used a ref pattern (`propsRef`) to access current props in callbacks
- Properly listed all dependencies in useEffect arrays
- Separated concerns into two useEffect hooks for better organization

### 4. Updated Package Dependencies

**Changes to package.json**:
```json
"peerDependencies": {
  "leaflet": "^1.8.0",
  "leaflet-draw": "^1.0.4",
  "react": "^18.0.0 || ^19.0.0",  // Added React 19 support
  "react-leaflet": "^4.0.0"
}
```

Removed `prop-types` from peer dependencies.

### 5. Updated TypeScript Definitions

**Changes**:
- Changed from class component to function component type
- Made `draw` and `position` props optional
- Fixed `onMounted` type to be more specific
- Exported `EditControlProps` interface

## Code Structure Improvements

### Before:
```javascript
// Memory leak - handlers not properly cleaned up
for (const key in eventHandlers) {
  map.on(eventHandlers[key], (evt) => {
    // ... handler logic
  });
}
```

### After:
```javascript
// Proper cleanup with Map tracking
const handlers = new Map();
for (const [propName, eventName] of Object.entries(eventHandlers)) {
  if (props[propName]) {
    const handler = (evt) => {
      props[propName](evt);
    };
    handlers.set(eventName, handler);
    map.on(eventName, handler);
  }
}

// Cleanup
for (const [eventName, handler] of handlers) {
  map.off(eventName, handler);
}
```

## Testing React 19 Compatibility

To test with React 19:

1. Install React 19:
   ```bash
   npm install react@^19.0.0 react-dom@^19.0.0
   ```

2. Use the new createRoot API (required in React 19):
   ```javascript
   import { createRoot } from 'react-dom/client';
   const root = createRoot(document.getElementById('root'));
   root.render(<App />);
   ```

3. The EditControl component works seamlessly with React 19's concurrent features.

## Migration Steps for Users

1. **Update React version** in your project
2. **No code changes needed** in how you use EditControl
3. **Remove any PropTypes usage** if you were extending the component
4. **Update to createRoot** for your app's entry point

## Benefits of These Changes

1. **React 19 Compatible**: Works with both React 18 and 19
2. **Better Performance**: Proper cleanup prevents memory leaks
3. **Type Safety**: TypeScript definitions provide better IDE support
4. **Future Proof**: Follows React best practices and latest patterns
5. **Smaller Bundle**: Removed PropTypes dependency

## Example Usage (Unchanged)

```jsx
import { MapContainer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

function MyMap() {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13}>
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={(e) => console.log('Created:', e)}
          onEdited={(e) => console.log('Edited:', e)}
          onDeleted={(e) => console.log('Deleted:', e)}
          draw={{
            rectangle: true,
            circle: true,
            polyline: true,
            polygon: true,
            marker: true,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
}
```

## Notes

- The edit controls functionality remains exactly the same
- All event handlers work as before
- The component is now more performant and follows React best practices
- Compatible with React's Strict Mode and concurrent features