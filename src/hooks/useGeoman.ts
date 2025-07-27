import { useState, useCallback, useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import type { Layer } from 'leaflet';
import { Map as LeafletMap, LayerGroup } from 'leaflet';
import type { 
  GeomanMap, 
  GeomanEvent, 
  GeomanCreateEvent, 
  GeomanEditEvent, 
  GeomanRemoveEvent,
  GeomanDragEvent,
  GeomanCutEvent,
  GeomanRotateEvent,
  GeomanDrawOptions,
  GeomanEditOptions,
  GeomanToolbarOptions,
  GeomanGlobalOptions,
  GeomanEventName
} from '../types/geoman';

export interface UseGeomanOptions {
  draw?: GeomanDrawOptions;
  edit?: GeomanEditOptions;
  toolbar?: GeomanToolbarOptions;
  global?: GeomanGlobalOptions;
  featureGroup?: Layer;
  
  // Event handlers
  onCreated?: (event: GeomanCreateEvent) => void;
  onEdited?: (event: GeomanEditEvent) => void;
  onRemoved?: (event: GeomanRemoveEvent) => void;
  onDragStart?: (event: GeomanDragEvent) => void;
  onDrag?: (event: GeomanDragEvent) => void;
  onDragEnd?: (event: GeomanDragEvent) => void;
  onCut?: (event: GeomanCutEvent) => void;
  onRotate?: (event: GeomanRotateEvent) => void;
  
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
  map: LeafletMap | null;
  featureGroup: Layer | null;
  isDrawing: boolean;
  isEditing: boolean;
  isRemoving: boolean;
  isDragging: boolean;
  isCutting: boolean;
  isRotating: boolean;
  currentMode: string | null;
  
  // Control functions
  enableDraw: (options?: GeomanDrawOptions) => void;
  disableDraw: () => void;
  enableEdit: (options?: GeomanEditOptions) => void;
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
  updateGlobalOptions: (options: GeomanGlobalOptions) => void;
  
  // Utility functions
  toggleDraw: () => void;
  toggleEdit: () => void;
  toggleRemove: () => void;
  toggleDrag: () => void;
  toggleCut: () => void;
  toggleRotate: () => void;
  
  // Geoman-specific methods
  getGeomanLayers: () => Layer[];
  removeGeomanLayers: () => void;
  toggleGlobalEditMode: () => void;
  toggleGlobalRemovalMode: () => void;
  toggleGlobalDragMode: () => void;
  toggleGlobalCutMode: () => void;
  toggleGlobalRotateMode: () => void;
}

export const useGeoman = (options: UseGeomanOptions = {}): UseGeomanReturn => {
  const map = useMap();
  const [featureGroup, setFeatureGroup] = useState<Layer | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isCutting, setIsCutting] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [currentMode, setCurrentMode] = useState<string | null>(null);
  
  const eventHandlersRef = useRef<Map<GeomanEventName, (event: GeomanEvent) => void>>(new Map());

  // Initialize Geoman
  useEffect(() => {
    if (!map) return;

    // Import Geoman dynamically
    import('@geoman-io/leaflet-geoman-free').then(() => {
      initializeGeoman();
    });
  }, [map]);

  const initializeGeoman = useCallback(() => {
    if (!map) return;

    const pm = map.pm;

    // Set global options
    if (options.global) {
      pm.setGlobalOptions(options.global);
    }

    // Set drawing options
    if (options.draw) {
      pm.setDrawOptions(options.draw);
    }

    // Set editing options
    if (options.edit) {
      pm.setEditOptions(options.edit);
    }

    // Set toolbar options
    if (options.toolbar) {
      pm.setToolbarOptions(options.toolbar);
    }

    // Set feature group if provided
    if (options.featureGroup) {
      setFeatureGroup(options.featureGroup);
      pm.setGlobalOptions({
        layerGroup: options.featureGroup
      });
    }

    // Bind event handlers
    bindEventHandlers();
  }, [map, options]);

  const updateStateFromEvent = useCallback((eventName: GeomanEventName) => {
    switch (eventName) {
      case 'pm:drawstart':
        setIsDrawing(true);
        setCurrentMode('drawing');
        break;
      case 'pm:drawstop':
        setIsDrawing(false);
        setCurrentMode(null);
        break;
      case 'pm:editstart':
        setIsEditing(true);
        setCurrentMode('editing');
        break;
      case 'pm:editstop':
        setIsEditing(false);
        setCurrentMode(null);
        break;
      case 'pm:removestart':
        setIsRemoving(true);
        setCurrentMode('removing');
        break;
      case 'pm:removestop':
        setIsRemoving(false);
        setCurrentMode(null);
        break;
      case 'pm:dragstart':
        setIsDragging(true);
        setCurrentMode('dragging');
        break;
      case 'pm:dragend':
        setIsDragging(false);
        setCurrentMode(null);
        break;
      case 'pm:cutstart':
        setIsCutting(true);
        setCurrentMode('cutting');
        break;
      case 'pm:cutend':
        setIsCutting(false);
        setCurrentMode(null);
        break;
      case 'pm:rotatestart':
        setIsRotating(true);
        setCurrentMode('rotating');
        break;
      case 'pm:rotateend':
        setIsRotating(false);
        setCurrentMode(null);
        break;
    }
  }, []);

  const bindEventHandlers = useCallback(() => {
    if (!map) return;

    const eventMap: Record<GeomanEventName, keyof UseGeomanOptions> = {
      'pm:create': 'onCreated',
      'pm:edit': 'onEdited',
      'pm:remove': 'onRemoved',
      'pm:drawstart': 'onDrawStart',
      'pm:drawstop': 'onDrawStop',
      'pm:drawvertex': 'onDrawVertex',
      'pm:editstart': 'onEditStart',
      'pm:editstop': 'onEditStop',
      'pm:editvertex': 'onEditVertex',
      'pm:editmove': 'onEditMove',
      'pm:editresize': 'onEditResize',
      'pm:removestart': 'onRemoveStart',
      'pm:removestop': 'onRemoveStop',
      'pm:dragstart': 'onDragStart',
      'pm:drag': 'onDrag',
      'pm:dragend': 'onDragEnd',
      'pm:cutstart': 'onCut',
      'pm:cut': 'onCut',
      'pm:cutend': 'onCut',
      'pm:rotatestart': 'onRotate',
      'pm:rotate': 'onRotate',
      'pm:rotateend': 'onRotate',
      'pm:globaldrawmodetoggled': 'onGlobalDrawModeToggled',
      'pm:globaldragmodetoggled': 'onGlobalDragModeToggled',
      'pm:globalremovalmodetoggled': 'onGlobalRemovalModeToggled',
      'pm:globalcutmodetoggled': 'onGlobalCutModeToggled',
      'pm:globalrotatemodetoggled': 'onGlobalRotateModeToggled',
    };

    Object.entries(eventMap).forEach(([eventName, propName]) => {
      const handler = options[propName];
      if (handler && typeof handler === 'function') {
        const boundHandler = (event: any) => {
          (handler as Function)(event);
          
          // Update state based on event type
          updateStateFromEvent(eventName as GeomanEventName);
        };
        eventHandlersRef.current.set(eventName as GeomanEventName, boundHandler);
        map.on(eventName, boundHandler);
      }
    });
  }, [map, options, updateStateFromEvent]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (!map) return;
      
      eventHandlersRef.current.forEach((handler, eventName) => {
        map.off(eventName, handler as any);
      });
      eventHandlersRef.current.clear();
    };
  }, [map]);

  // Control functions
  const enableDraw = useCallback((drawOptions?: GeomanDrawOptions) => {
    if (map) {
      map.pm.enableDraw(drawOptions);
    }
  }, [map]);

  const disableDraw = useCallback(() => {
    if (map) {
      map.pm.disableDraw();
    }
  }, [map]);

  const enableEdit = useCallback((editOptions?: GeomanEditOptions) => {
    if (map) {
      map.pm.enableEdit(editOptions);
    }
  }, [map]);

  const disableEdit = useCallback(() => {
    if (map) {
      map.pm.disableEdit();
    }
  }, [map]);

  const enableRemove = useCallback(() => {
    if (map) {
      map.pm.enableRemove();
    }
  }, [map]);

  const disableRemove = useCallback(() => {
    if (map) {
      map.pm.disableRemove();
    }
  }, [map]);

  const enableDrag = useCallback(() => {
    if (map) {
      map.pm.enableDrag();
    }
  }, [map]);

  const disableDrag = useCallback(() => {
    if (map) {
      map.pm.disableDrag();
    }
  }, [map]);

  const enableCut = useCallback(() => {
    if (map) {
      map.pm.enableCut();
    }
  }, [map]);

  const disableCut = useCallback(() => {
    if (map) {
      map.pm.disableCut();
    }
  }, [map]);

  const enableRotate = useCallback(() => {
    if (map) {
      map.pm.enableRotate();
    }
  }, [map]);

  const disableRotate = useCallback(() => {
    if (map) {
      map.pm.disableRotate();
    }
  }, [map]);

  // Layer management
  const clearLayers = useCallback(() => {
    if (featureGroup && 'clearLayers' in featureGroup) {
      (featureGroup as any).clearLayers();
    }
  }, [featureGroup]);

  const getLayers = useCallback(() => {
    if (featureGroup && 'getLayers' in featureGroup) {
      return (featureGroup as any).getLayers();
    }
    return [];
  }, [featureGroup]);

  const addLayer = useCallback((layer: Layer) => {
    if (featureGroup && 'addLayer' in featureGroup) {
      (featureGroup as any).addLayer(layer);
    }
  }, [featureGroup]);

  const removeLayer = useCallback((layer: Layer) => {
    if (featureGroup && 'removeLayer' in featureGroup) {
      (featureGroup as any).removeLayer(layer);
    }
  }, [featureGroup]);

  // Options management
  const updateDrawOptions = useCallback((drawOptions: GeomanDrawOptions) => {
    if (map) {
      map.pm.setDrawOptions(drawOptions);
    }
  }, [map]);

  const updateEditOptions = useCallback((editOptions: GeomanEditOptions) => {
    if (map) {
      map.pm.setEditOptions(editOptions);
    }
  }, [map]);

  const updateToolbarOptions = useCallback((toolbarOptions: GeomanToolbarOptions) => {
    if (map) {
      map.pm.setToolbarOptions(toolbarOptions);
    }
  }, [map]);

  const updateGlobalOptions = useCallback((globalOptions: GeomanGlobalOptions) => {
    if (map) {
      map.pm.setGlobalOptions(globalOptions);
    }
  }, [map]);

  // Utility functions
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

  // Geoman-specific methods
  const getGeomanLayers = useCallback(() => {
    return map ? map.pm.getGeomanLayers() : [];
  }, [map]);

  const removeGeomanLayers = useCallback(() => {
    if (map) {
      map.pm.removeGeomanLayers();
    }
  }, [map]);

  const toggleGlobalEditMode = useCallback(() => {
    if (map) {
      map.pm.toggleGlobalEditMode();
    }
  }, [map]);

  const toggleGlobalRemovalMode = useCallback(() => {
    if (map) {
      map.pm.toggleGlobalRemovalMode();
    }
  }, [map]);

  const toggleGlobalDragMode = useCallback(() => {
    if (map) {
      map.pm.toggleGlobalDragMode();
    }
  }, [map]);

  const toggleGlobalCutMode = useCallback(() => {
    if (map) {
      map.pm.toggleGlobalCutMode();
    }
  }, [map]);

  const toggleGlobalRotateMode = useCallback(() => {
    if (map) {
      map.pm.toggleGlobalRotateMode();
    }
  }, [map]);

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
    
    // Control functions
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
    
    // Layer management
    clearLayers,
    getLayers,
    addLayer,
    removeLayer,
    
    // Options management
    updateDrawOptions,
    updateEditOptions,
    updateToolbarOptions,
    updateGlobalOptions,
    
    // Utility functions
    toggleDraw,
    toggleEdit,
    toggleRemove,
    toggleDrag,
    toggleCut,
    toggleRotate,
    
    // Geoman-specific methods
    getGeomanLayers,
    removeGeomanLayers,
    toggleGlobalEditMode,
    toggleGlobalRemovalMode,
    toggleGlobalDragMode,
    toggleGlobalCutMode,
    toggleGlobalRotateMode,
  };
};