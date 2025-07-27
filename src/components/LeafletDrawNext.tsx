import React from 'react';
import { createControlComponent } from '@react-leaflet/core';
import type { ControlOptions } from 'leaflet';
import { Map as LeafletMap, Control as LeafletControl } from 'leaflet';
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

// Import Geoman CSS
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

export interface LeafletDrawNextProps extends ControlOptions {
  // Position and styling
  position?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
  className?: string;
  style?: React.CSSProperties;
  
  // Drawing options
  draw?: GeomanDrawOptions;
  
  // Editing options
  edit?: GeomanEditOptions;
  
  // Toolbar options
  toolbar?: GeomanToolbarOptions;
  
  // Global options
  global?: GeomanGlobalOptions;
  
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
  
  // Lifecycle callbacks
  onMounted?: (map: LeafletMap) => void;
  onUnmounted?: (map: LeafletMap) => void;
}

class LeafletDrawNextControl extends LeafletControl {
  override options: LeafletDrawNextProps;
  private eventHandlers: Map<GeomanEventName, (event: any) => void>;
  private _map: LeafletMap | null;

  constructor(options: LeafletDrawNextProps) {
    super(options);
    this.options = { ...options };
    this.eventHandlers = new Map<GeomanEventName, (event: any) => void>();
    this._map = null;
  }

  override onAdd(map: LeafletMap): HTMLElement {
    this._map = map;
    
    // Import Geoman dynamically
    import('@geoman-io/leaflet-geoman-free').then(() => {
      this.initializeGeoman(map);
    });

    // Create container
    const container = document.createElement('div');
    container.className = 'leaflet-draw-next-control';
    
    if (this.options.className) {
      container.className += ` ${this.options.className}`;
    }
    
    if (this.options.style) {
      Object.assign(container.style, this.options.style);
    }

    return container;
  }

  override onRemove(map: LeafletMap): void {
    this.cleanup(map);
    this._map = null;
  }

  private initializeGeoman(map: LeafletMap): void {
    const pm = map.pm;

    // Set global options
    if (this.options.global) {
      pm.setGlobalOptions(this.options.global);
    }

    // Set drawing options
    if (this.options.draw) {
      pm.setDrawOptions(this.options.draw);
    }

    // Set editing options
    if (this.options.edit) {
      pm.setEditOptions(this.options.edit);
    }

    // Set toolbar options
    if (this.options.toolbar) {
      pm.setToolbarOptions(this.options.toolbar);
    }

    // Bind event handlers
    this.bindEventHandlers(map);

    // Call mounted callback
    if (this.options.onMounted) {
      this.options.onMounted(map);
    }
  }

  private bindEventHandlers(map: LeafletMap): void {
    const eventMap: Record<GeomanEventName, keyof LeafletDrawNextProps> = {
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
      const handler = this.options[propName];
      if (handler && typeof handler === 'function') {
        const boundHandler = (event: any) => {
          (handler as Function)(event);
        };
        this.eventHandlers.set(eventName as GeomanEventName, boundHandler);
        map.on(eventName, boundHandler);
      }
    });
  }

  private cleanup(map: LeafletMap): void {
    // Remove event handlers
    this.eventHandlers.forEach((handler, eventName) => {
      map.off(eventName, handler);
    });
    this.eventHandlers.clear();

    // Call unmounted callback
    if (this.options.onUnmounted) {
      this.options.onUnmounted(map);
    }
  }

  // Public methods for programmatic control
  enableDraw(options?: GeomanDrawOptions): void {
    if (this._map) {
      this._map.pm.enableDraw(options);
    }
  }

  disableDraw(): void {
    if (this._map) {
      this._map.pm.disableDraw();
    }
  }

  enableEdit(options?: GeomanEditOptions): void {
    if (this._map) {
      this._map.pm.enableEdit(options);
    }
  }

  disableEdit(): void {
    if (this._map) {
      this._map.pm.disableEdit();
    }
  }

  enableRemove(): void {
    if (this._map) {
      this._map.pm.enableRemove();
    }
  }

  disableRemove(): void {
    if (this._map) {
      this._map.pm.disableRemove();
    }
  }

  enableDrag(): void {
    if (this._map) {
      this._map.pm.enableDrag();
    }
  }

  disableDrag(): void {
    if (this._map) {
      this._map.pm.disableDrag();
    }
  }

  enableCut(): void {
    if (this._map) {
      this._map.pm.enableCut();
    }
  }

  disableCut(): void {
    if (this._map) {
      this._map.pm.disableCut();
    }
  }

  enableRotate(): void {
    if (this._map) {
      this._map.pm.enableRotate();
    }
  }

  disableRotate(): void {
    if (this._map) {
      this._map.pm.disableRotate();
    }
  }

  getGeomanLayers(): any[] {
    return this._map ? this._map.pm.getGeomanLayers() : [];
  }

  removeGeomanLayers(): void {
    if (this._map) {
      this._map.pm.removeGeomanLayers();
    }
  }
}

const createLeafletDrawNextInstance = (props: LeafletDrawNextProps) => {
  return new LeafletDrawNextControl(props);
};

export const LeafletDrawNext = createControlComponent(createLeafletDrawNextInstance);

export default LeafletDrawNext;