---
"react-leaflet-draw-next": patch
---
React 19 and react-leaflet v5 compatibility with package rename
- Migrated to React 19 and react-leaflet v5
- Renamed package from react-leaflet-draw to react-leaflet-draw-next
- Updated EditControl API to require featureGroup prop
- Changed from Map to MapContainer component
- Updated all dependencies and peer dependencies
- Added proper TypeScript support for React 19
- Breaking changes: requires featureGroup prop, uses MapContainer instead of Map
