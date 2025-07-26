import { useState, useCallback, useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import type { Map, Layer } from 'leaflet';
import type { 
  GeomanEvent, 
  GeomanCreateEvent, 
  GeomanEditEvent, 
  GeomanRemoveEvent,
  GeomanDrawOptions,
  GeomanEditOptions,
  GeomanToolbarOptions 
} from '../components/LeafletDrawNext';

export interface UseGeomanOptions {
  draw?: GeomanDrawOptions;
  edit?: GeomanEditOptions;
  toolbar?: GeomanToolbarOptions;
  featureGroup?: Layer;
  
  // Event handlers
  onCreated?: (event: GeomanCreateEvent) => void;
  onEdited?: (event: GeomanEditEvent) => void;
  onRemoved?: (event: GeomanRemoveEvent) => void;
  onDragStart?: (event: GeomanEvent) => void;
  onDrag?: (event: GeomanEvent) => void;
  onDragEnd?: (event: GeomanEvent) => void;
  onCut?: (event: GeomanEvent) => void;
  onRotate?: (event: GeomanEvent) => void;
  
  // Drawing events
  onDrawStart?: (event: GeomanCreateEvent) => void;
  onDrawStop?: (event: GeomanCreateEvent) => void;
  onDrawVertex?: (event: GeomanCreateEvent) => void;
  
  // Editing events
  onEditStart?: (event: GeomanEditEvent) => void;
  onEditStop?: (event: GeomanEditEvent) => void;
  onEditVertex?: (event: GeomanEditEvent) => void;
  onEditMove?: (event: GeomanEditEvent) => void;
  onEditResize?: (event: GeomanEditEvent) => void;
  
  // Removal events
  onRemoveStart?: (event: GeomanRemoveEvent) => void;
  onRemoveStop?: (event: GeomanRemoveEvent) => void;
  
  // Global mode events
  onGlobalDrawModeToggled?: (event: GeomanEvent) => void;
  onGlobalDragModeToggled?: (event: GeomanEvent) => void;
  onGlobalRemovalModeToggled?: (event: GeomanEvent) => void;
  onGlobalCutModeToggled?: (event: GeomanEvent) => void;
  onGlobalRotateModeToggled?: (event: GeomanEvent) => void;
}

export interface UseGeomanReturn {
  map: Map | null;
  featureGroup: Layer | null;
  isDrawing: boolean;
  isEditing: boolean;
  isRemoving: boolean;
  isDragging: boolean;
  isCutting: boolean;
  isRotating: boolean;
  currentMode: string | null;
  
  // Control functions
  enableDraw: () => void;
  disableDraw: () => void;
  enableEdit: () => void;
  disableEdit: () => void;
  enableRemove: () => void;
  disableRemove: () => void;
  enableDrag: () => void;
  disableDrag: () => void;
  enableCut: () => void;
  disableCut: () => void;
  enableRotate: () => void;
  disableRotate: () => void;
  
  // Layer management
  clearLayers: () => void;
  getLayers: () => Layer[];
  addLayer: (layer: Layer) => void;
  removeLayer: (layer: Layer) => void;
  
  // Options management
  updateDrawOptions: (options: GeomanDrawOptions) => void;
  updateEditOptions: (options: GeomanEditOptions) => void;
  updateToolbarOptions: (options: GeomanToolbarOptions) => void;
  
  // Utility functions
  toggleDraw: () => void;
  toggleEdit: () => void;
  toggleRemove: () => void;
  toggleDrag: () => void;
  toggleCut: () => void;
  toggleRotate: () => void;
}

export const useGeoman = (options: UseGeomanOptions = {}): UseGeomanReturn => {
  const map = useMap();
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isCutting, setIsCutting] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [currentMode, setCurrentMode] = useState<string | null>(null);
  const [featureGroup, setFeatureGroup] = useState<Layer | null>(options.featureGroup || null);
  
  const eventHandlersRef = useRef<Map<string, Function>>(new Map());

  // Initialize Geoman
  useEffect(() => {
    if (!map) return;

    // Import Geoman if not already available
    if (!map.pm) {
      import('@geoman-io/leaflet-geoman-free');
    }

    // Enable Geoman
    map.pm.enable();

    // Configure options
    if (options.draw) {
      Object.entries(options.draw).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          map.pm.setDrawOptions(key as any, value);
        }
      });
    }

    if (options.edit) {
      Object.entries(options.edit).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          map.pm.setEditOptions(key as any, value);
        }
      });
    }

    if (options.toolbar) {
      map.pm.setToolbarOptions(options.toolbar);
    }

    if (featureGroup) {
      map.pm.setGlobalOptions({
        layerGroup: featureGroup
      });
    }

    // Add event listeners
    const events = {
      'pm:create': options.onCreated,
      'pm:edit': options.onEdited,
      'pm:remove': options.onRemoved,
      'pm:dragstart': options.onDragStart,
      'pm:drag': options.onDrag,
      'pm:dragend': options.onDragEnd,
      'pm:cut': options.onCut,
      'pm:rotate': options.onRotate,
      'pm:drawstart': options.onDrawStart,
      'pm:drawstop': options.onDrawStop,
      'pm:drawvertex': options.onDrawVertex,
      'pm:editstart': options.onEditStart,
      'pm:editstop': options.onEditStop,
      'pm:editvertex': options.onEditVertex,
      'pm:editmove': options.onEditMove,
      'pm:editresize': options.onEditResize,
      'pm:removestart': options.onRemoveStart,
      'pm:removestop': options.onRemoveStop,
      'pm:globaldrawmodetoggled': options.onGlobalDrawModeToggled,
      'pm:globaldragmodetoggled': options.onGlobalDragModeToggled,
      'pm:globalremovalmodetoggled': options.onGlobalRemovalModeToggled,
      'pm:globalcutmodetoggled': options.onGlobalCutModeToggled,
      'pm:globalrotatemodetoggled': options.onGlobalRotateModeToggled,
    };

    Object.entries(events).forEach(([event, handler]) => {
      if (handler) {
        const boundHandler = handler.bind(null);
        map.on(event, boundHandler);
        eventHandlersRef.current.set(event, boundHandler);
      }
    });

    // Add state tracking events
    map.on('pm:globaldrawmodetoggled', (e: any) => {
      setIsDrawing(e.enabled);
      setCurrentMode(e.enabled ? 'draw' : null);
    });

    map.on('pm:globaleditmodetoggled', (e: any) => {
      setIsEditing(e.enabled);
      setCurrentMode(e.enabled ? 'edit' : null);
    });

    map.on('pm:globalremovalmodetoggled', (e: any) => {
      setIsRemoving(e.enabled);
      setCurrentMode(e.enabled ? 'remove' : null);
    });

    map.on('pm:globaldragmodetoggled', (e: any) => {
      setIsDragging(e.enabled);
      setCurrentMode(e.enabled ? 'drag' : null);
    });

    map.on('pm:globalcutmodetoggled', (e: any) => {
      setIsCutting(e.enabled);
      setCurrentMode(e.enabled ? 'cut' : null);
    });

    map.on('pm:globalrotatemodetoggled', (e: any) => {
      setIsRotating(e.enabled);
      setCurrentMode(e.enabled ? 'rotate' : null);
    });

    return () => {
      // Cleanup
      eventHandlersRef.current.forEach((handler, event) => {
        map.off(event, handler);
      });
      eventHandlersRef.current.clear();
      
      if (map.pm) {
        map.pm.disable();
      }
    };
  }, [map, options, featureGroup]);

  // Control functions
  const enableDraw = useCallback(() => {
    if (map?.pm) {
      map.pm.enableDraw('Polygon');
    }
  }, [map]);

  const disableDraw = useCallback(() => {
    if (map?.pm) {
      map.pm.disableDraw();
    }
  }, [map]);

  const enableEdit = useCallback(() => {
    if (map?.pm) {
      map.pm.enableGlobalEditMode();
    }
  }, [map]);

  const disableEdit = useCallback(() => {
    if (map?.pm) {
      map.pm.disableGlobalEditMode();
    }
  }, [map]);

  const enableRemove = useCallback(() => {
    if (map?.pm) {
      map.pm.enableGlobalRemovalMode();
    }
  }, [map]);

  const disableRemove = useCallback(() => {
    if (map?.pm) {
      map.pm.disableGlobalRemovalMode();
    }
  }, [map]);

  const enableDrag = useCallback(() => {
    if (map?.pm) {
      map.pm.enableGlobalDragMode();
    }
  }, [map]);

  const disableDrag = useCallback(() => {
    if (map?.pm) {
      map.pm.disableGlobalDragMode();
    }
  }, [map]);

  const enableCut = useCallback(() => {
    if (map?.pm) {
      map.pm.enableGlobalCutMode();
    }
  }, [map]);

  const disableCut = useCallback(() => {
    if (map?.pm) {
      map.pm.disableGlobalCutMode();
    }
  }, [map]);

  const enableRotate = useCallback(() => {
    if (map?.pm) {
      map.pm.enableGlobalRotateMode();
    }
  }, [map]);

  const disableRotate = useCallback(() => {
    if (map?.pm) {
      map.pm.disableGlobalRotateMode();
    }
  }, [map]);

  // Layer management
  const clearLayers = useCallback(() => {
    if (featureGroup) {
      featureGroup.clearLayers();
    }
  }, [featureGroup]);

  const getLayers = useCallback(() => {
    if (featureGroup) {
      return featureGroup.getLayers();
    }
    return [];
  }, [featureGroup]);

  const addLayer = useCallback((layer: Layer) => {
    if (featureGroup) {
      featureGroup.addLayer(layer);
    }
  }, [featureGroup]);

  const removeLayer = useCallback((layer: Layer) => {
    if (featureGroup) {
      featureGroup.removeLayer(layer);
    }
  }, [featureGroup]);

  // Options management
  const updateDrawOptions = useCallback((newOptions: GeomanDrawOptions) => {
    if (map?.pm) {
      Object.entries(newOptions).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          map.pm.setDrawOptions(key as any, value);
        }
      });
    }
  }, [map]);

  const updateEditOptions = useCallback((newOptions: GeomanEditOptions) => {
    if (map?.pm) {
      Object.entries(newOptions).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          map.pm.setEditOptions(key as any, value);
        }
      });
    }
  }, [map]);

  const updateToolbarOptions = useCallback((newOptions: GeomanToolbarOptions) => {
    if (map?.pm) {
      map.pm.setToolbarOptions(newOptions);
    }
  }, [map]);

  // Toggle functions
  const toggleDraw = useCallback(() => {
    if (isDrawing) {
      disableDraw();
    } else {
      enableDraw();
    }
  }, [isDrawing, enableDraw, disableDraw]);

  const toggleEdit = useCallback(() => {
    if (isEditing) {
      disableEdit();
    } else {
      enableEdit();
    }
  }, [isEditing, enableEdit, disableEdit]);

  const toggleRemove = useCallback(() => {
    if (isRemoving) {
      disableRemove();
    } else {
      enableRemove();
    }
  }, [isRemoving, enableRemove, disableRemove]);

  const toggleDrag = useCallback(() => {
    if (isDragging) {
      disableDrag();
    } else {
      enableDrag();
    }
  }, [isDragging, enableDrag, disableDrag]);

  const toggleCut = useCallback(() => {
    if (isCutting) {
      disableCut();
    } else {
      enableCut();
    }
  }, [isCutting, enableCut, disableCut]);

  const toggleRotate = useCallback(() => {
    if (isRotating) {
      disableRotate();
    } else {
      enableRotate();
    }
  }, [isRotating, enableRotate, disableRotate]);

  return {
    map,
    featureGroup,
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
    addLayer,
    removeLayer,
    updateDrawOptions,
    updateEditOptions,
    updateToolbarOptions,
    toggleDraw,
    toggleEdit,
    toggleRemove,
    toggleDrag,
    toggleCut,
    toggleRotate,
  };
};