// Main component
export { default as LeafletDrawNext, LeafletDrawNext as default } from './components/LeafletDrawNext';

// Custom hook
export { useGeoman } from './hooks/useGeoman';

// Component types
export type { LeafletDrawNextProps } from './components/LeafletDrawNext';

// Hook types
export type {
  UseGeomanOptions,
  UseGeomanReturn,
} from './hooks/useGeoman';

// Geoman types
export type {
  GeomanMap,
  GeomanLayer,
  GeomanMarker,
  GeomanPolygon,
  GeomanPolyline,
  GeomanCircle,
  GeomanCircleMarker,
  GeomanEvent,
  GeomanCreateEvent,
  GeomanEditEvent,
  GeomanRemoveEvent,
  GeomanDragEvent,
  GeomanCutEvent,
  GeomanRotateEvent,
  GeomanDrawOptions,
  GeomanEditOptions,
  GeomanRemoveOptions,
  GeomanCutOptions,
  GeomanRotateOptions,
  GeomanTextOptions,
  GeomanMarkerOptions,
  GeomanPolygonOptions,
  GeomanPolylineOptions,
  GeomanCircleOptions,
  GeomanRectangleOptions,
  GeomanCircleMarkerOptions,
  GeomanToolbarOptions,
  GeomanGlobalOptions,
  GeomanEventName,
} from './types/geoman';

// Type guards
export {
  isGeomanCreateEvent,
  isGeomanEditEvent,
  isGeomanRemoveEvent,
  isGeomanDragEvent,
  isGeomanCutEvent,
  isGeomanRotateEvent,
  isGeomanMarker,
  isGeomanPolygon,
  isGeomanPolyline,
  isGeomanCircle,
  isGeomanRectangle,
  isGeomanCircleMarker,
} from './utils/typeGuards';

// Re-export for backward compatibility
export { LeafletDrawNext as EditControl } from './components/LeafletDrawNext';