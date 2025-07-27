# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release of React-Leaflet-Geoman
- `LeafletDrawNext` component with full Geoman integration
- `useGeoman` custom hook for programmatic control
- Comprehensive TypeScript type definitions
- Full event system support (create, edit, remove, drag, cut, rotate)
- Customizable drawing and editing options
- Toolbar configuration options
- Feature group support
- React 19 compatibility
- SSR/Next.js compatibility
- Tree-shakeable exports
- Comprehensive testing setup
- Example React app with Vite
- Modern build system with ESM and CJS support

### Features
- **Drawing Tools**: Marker, Circle, Rectangle, Polygon, Polyline, CircleMarker, Text
- **Editing Tools**: Edit, Remove, Drag, Cut, Rotate
- **Event System**: All Geoman events with proper TypeScript typing
- **State Management**: Real-time state tracking for all drawing modes
- **Layer Management**: Add, remove, clear, and manage layers
- **Options Management**: Dynamic update of drawing and editing options
- **Accessibility**: Keyboard navigation and ARIA labels support

### Technical
- Modern TypeScript configuration with strict type checking
- ESLint configuration with TypeScript and React rules
- Jest testing setup with React Testing Library
- Comprehensive mocking for Leaflet and Geoman
- Source maps and declaration maps for debugging
- Optimized bundle size with tree shaking
- Modern module resolution and exports

## [1.0.0] - 2024-01-XX

### Added
- Initial release
- Complete migration from leaflet-draw to geoman-io
- Full TypeScript support
- React 19 support (primary target)
- Comprehensive documentation and examples

---

## Migration Guide

### From react-leaflet-draw

**Before:**
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

**After:**
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
6. **Modern dependencies**: Updated to latest Geoman.io

---

## Version History

- **1.0.0**: Initial release with complete geoman-io integration