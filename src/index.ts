// Main component
export { default as LeafletDrawNext, LeafletDrawNext as default } from './components/LeafletDrawNext';

// Custom hook
export { useGeoman } from './hooks/useGeoman';

// Types
export type {
  LeafletDrawNextProps,
  GeomanEvent,
  GeomanCreateEvent,
  GeomanEditEvent,
  GeomanRemoveEvent,
  GeomanDrawOptions,
  GeomanEditOptions,
  GeomanToolbarOptions,
} from './components/LeafletDrawNext';

export type {
  UseGeomanOptions,
  UseGeomanReturn,
} from './hooks/useGeoman';

// Re-export for backward compatibility
export { LeafletDrawNext as EditControl } from './components/LeafletDrawNext';