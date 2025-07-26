import React from 'react';
import { createControlComponent } from '@react-leaflet/core';
import type { Map, ControlOptions, ControlPosition, Layer } from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

// Event types
export interface GeomanEvent {
  layer: Layer;
  layerType: string;
  originalEvent: Event;
}

export interface GeomanCreateEvent extends GeomanEvent {
  layerType: 'marker' | 'circle' | 'rectangle' | 'polygon' | 'polyline' | 'circlemarker' | 'text';
}

export interface GeomanEditEvent extends GeomanEvent {
  layerType: 'marker' | 'circle' | 'rectangle' | 'polygon' | 'polyline' | 'circlemarker' | 'text';
}

export interface GeomanRemoveEvent extends GeomanEvent {
  layerType: 'marker' | 'circle' | 'rectangle' | 'polygon' | 'polyline' | 'circlemarker' | 'text';
}

// Draw options
export interface GeomanDrawOptions {
  marker?: boolean | object;
  circle?: boolean | object;
  rectangle?: boolean | object;
  polygon?: boolean | object;
  polyline?: boolean | object;
  circlemarker?: boolean | object;
  text?: boolean | object;
}

// Edit options
export interface GeomanEditOptions {
  edit?: boolean | object;
  remove?: boolean | object;
  drag?: boolean | object;
  cut?: boolean | object;
  rotate?: boolean | object;
}

// Toolbar options
export interface GeomanToolbarOptions {
  position?: ControlPosition;
  drawMarker?: boolean;
  drawCircleMarker?: boolean;
  drawPolyline?: boolean;
  drawRectangle?: boolean;
  drawPolygon?: boolean;
  drawCircle?: boolean;
  drawText?: boolean;
  editMode?: boolean;
  dragMode?: boolean;
  cutPolygon?: boolean;
  removalMode?: boolean;
  rotateMode?: boolean;
  oneBlock?: boolean;
  drawTextInOneBlock?: boolean;
  editInOneBlock?: boolean;
}

// Main props interface
export interface LeafletDrawNextProps extends ControlOptions {
  position?: ControlPosition;
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
  
  // Lifecycle events
  onMounted?: (map: Map) => void;
  onUnmounted?: (map: Map) => void;
}

// Create the Leaflet control class
const LeafletDrawNextControl = (L.Control as any).extend({
  options: {},

  initialize(options: LeafletDrawNextProps) {
    L.setOptions(this, options);
    this.eventHandlers = new Map();
  },

  addTo(map: Map) {
    if (!map.pm) {
      console.warn('Geoman is not available on the map. Make sure to import @geoman-io/leaflet-geoman-free');
      return this;
    }

    // Enable Geoman on the map
    map.pm.enable();

    // Configure draw options
    if (this.options.draw) {
      Object.entries(this.options.draw).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          map.pm.setDrawOptions(key as any, value);
        }
      });
    }

    // Configure edit options
    if (this.options.edit) {
      Object.entries(this.options.edit).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          map.pm.setEditOptions(key as any, value);
        }
      });
    }

    // Configure toolbar options
    if (this.options.toolbar) {
      map.pm.setToolbarOptions(this.options.toolbar);
    }

    // Set feature group if provided
    if (this.options.featureGroup) {
      map.pm.setGlobalOptions({
        layerGroup: this.options.featureGroup
      });
    }

    // Add event listeners
    this.addEventListeners(map);

    // Call mounted callback
    if (this.options.onMounted) {
      this.options.onMounted(map);
    }

    return this;
  },

  remove(map: Map) {
    if (!map.pm) return this;

    // Remove event listeners
    this.removeEventListeners(map);

    // Disable Geoman
    map.pm.disable();

    // Call unmounted callback
    if (this.options.onUnmounted) {
      this.options.onUnmounted(map);
    }

    return this;
  },

  addEventListeners(map: Map) {
    const events = {
      'pm:create': this.options.onCreated,
      'pm:edit': this.options.onEdited,
      'pm:remove': this.options.onRemoved,
      'pm:dragstart': this.options.onDragStart,
      'pm:drag': this.options.onDrag,
      'pm:dragend': this.options.onDragEnd,
      'pm:cut': this.options.onCut,
      'pm:rotate': this.options.onRotate,
      'pm:drawstart': this.options.onDrawStart,
      'pm:drawstop': this.options.onDrawStop,
      'pm:drawvertex': this.options.onDrawVertex,
      'pm:editstart': this.options.onEditStart,
      'pm:editstop': this.options.onEditStop,
      'pm:editvertex': this.options.onEditVertex,
      'pm:editmove': this.options.onEditMove,
      'pm:editresize': this.options.onEditResize,
      'pm:removestart': this.options.onRemoveStart,
      'pm:removestop': this.options.onRemoveStop,
      'pm:globaldrawmodetoggled': this.options.onGlobalDrawModeToggled,
      'pm:globaldragmodetoggled': this.options.onGlobalDragModeToggled,
      'pm:globalremovalmodetoggled': this.options.onGlobalRemovalModeToggled,
      'pm:globalcutmodetoggled': this.options.onGlobalCutModeToggled,
      'pm:globalrotatemodetoggled': this.options.onGlobalRotateModeToggled,
    };

    Object.entries(events).forEach(([event, handler]) => {
      if (handler) {
        const boundHandler = handler.bind(this);
        map.on(event, boundHandler);
        this.eventHandlers.set(event, boundHandler);
      }
    });
  },

  removeEventListeners(map: Map) {
    this.eventHandlers.forEach((handler, event) => {
      map.off(event, handler);
    });
    this.eventHandlers.clear();
  },

  updateOptions(newOptions: Partial<LeafletDrawNextProps>) {
    if (!this._map) return;

    // Update draw options
    if (newOptions.draw) {
      Object.entries(newOptions.draw).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          this._map.pm.setDrawOptions(key as any, value);
        }
      });
    }

    // Update edit options
    if (newOptions.edit) {
      Object.entries(newOptions.edit).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          this._map.pm.setEditOptions(key as any, value);
        }
      });
    }

    // Update toolbar options
    if (newOptions.toolbar) {
      this._map.pm.setToolbarOptions(newOptions.toolbar);
    }
  }
});

// Create the control instance
const createLeafletDrawNextInstance = (props: LeafletDrawNextProps) => {
  return new LeafletDrawNextControl(props);
};

// Export the React component
export const LeafletDrawNext = createControlComponent(createLeafletDrawNextInstance);

export default LeafletDrawNext;