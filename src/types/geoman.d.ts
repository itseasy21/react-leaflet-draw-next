import * as L from 'leaflet';

// Extend Leaflet Map interface with Geoman functionality
declare module 'leaflet' {
  interface Map {
    pm: GeomanMap;
  }
  
  interface Layer {
    pm?: GeomanLayer;
  }
  
  interface Marker {
    pm?: GeomanMarker;
  }
  
  interface Polygon {
    pm?: GeomanPolygon;
  }
  
  interface Polyline {
    pm?: GeomanPolyline;
  }
  
  interface Circle {
    pm?: GeomanCircle;
  }
  
  interface CircleMarker {
    pm?: GeomanCircleMarker;
  }
}

// Core Geoman Map interface
export interface GeomanMap {
  enable(): void;
  disable(): void;
  
  // Drawing options
  setPathOptions(options: L.PathOptions): void;
  setDrawOptions(options: GeomanDrawOptions): void;
  setEditOptions(options: GeomanEditOptions): void;
  setRemoveOptions(options: GeomanRemoveOptions): void;
  setCutOptions(options: GeomanCutOptions): void;
  setRotateOptions(options: GeomanRotateOptions): void;
  setTextOptions(options: GeomanTextOptions): void;
  
  // Shape-specific options
  setCircleOptions(options: GeomanCircleOptions): void;
  setRectangleOptions(options: GeomanRectangleOptions): void;
  setPolygonOptions(options: GeomanPolygonOptions): void;
  setPolylineOptions(options: GeomanPolylineOptions): void;
  setMarkerOptions(options: GeomanMarkerOptions): void;
  setCircleMarkerOptions(options: GeomanCircleMarkerOptions): void;
  
  // Toolbar and global options
  setToolbarOptions(options: GeomanToolbarOptions): void;
  setGlobalOptions(options: GeomanGlobalOptions): void;
  
  // Mode control
  enableDraw(options?: GeomanDrawOptions): void;
  disableDraw(): void;
  enableEdit(options?: GeomanEditOptions): void;
  disableEdit(): void;
  enableRemove(options?: GeomanRemoveOptions): void;
  disableRemove(): void;
  enableCut(options?: GeomanCutOptions): void;
  disableCut(): void;
  enableRotate(options?: GeomanRotateOptions): void;
  disableRotate(): void;
  enableDrag(options?: any): void;
  disableDrag(): void;
  
  // Utility methods
  getGeomanLayers(): L.Layer[];
  removeGeomanLayers(): void;
  toggleGlobalEditMode(): void;
  toggleGlobalRemovalMode(): void;
  toggleGlobalDragMode(): void;
  toggleGlobalCutMode(): void;
  toggleGlobalRotateMode(): void;
}

// Layer-specific Geoman interfaces
export interface GeomanLayer {
  enable(options?: any): void;
  disable(): void;
  toggleEdit(): void;
  toggleRemove(): void;
  toggleDrag(): void;
  toggleCut(): void;
  toggleRotate(): void;
  setPathOptions(options: L.PathOptions): void;
}

export interface GeomanMarker extends GeomanLayer {
  enable(options?: GeomanMarkerOptions): void;
}

export interface GeomanPolygon extends GeomanLayer {
  enable(options?: GeomanPolygonOptions): void;
}

export interface GeomanPolyline extends GeomanLayer {
  enable(options?: GeomanPolylineOptions): void;
}

export interface GeomanCircle extends GeomanLayer {
  enable(options?: GeomanCircleOptions): void;
}

export interface GeomanCircleMarker extends GeomanLayer {
  enable(options?: GeomanCircleMarkerOptions): void;
}

// Event interfaces
export interface GeomanEvent {
  layer: L.Layer;
  layerType: string;
  originalEvent: Event;
  workingLayer?: L.Layer;
  shape?: string;
}

export interface GeomanCreateEvent extends GeomanEvent {
  layer: L.Layer;
  layerType: string;
  originalEvent: Event;
  workingLayer?: L.Layer;
  shape?: string;
}

export interface GeomanEditEvent extends GeomanEvent {
  layer: L.Layer;
  layerType: string;
  originalEvent: Event;
  workingLayer?: L.Layer;
  shape?: string;
}

export interface GeomanRemoveEvent extends GeomanEvent {
  layer: L.Layer;
  layerType: string;
  originalEvent: Event;
  workingLayer?: L.Layer;
  shape?: string;
}

export interface GeomanDragEvent extends GeomanEvent {
  layer: L.Layer;
  layerType: string;
  originalEvent: Event;
  workingLayer?: L.Layer;
  shape?: string;
  dragStartLatLng?: L.LatLng;
  dragEndLatLng?: L.LatLng;
}

export interface GeomanCutEvent extends GeomanEvent {
  layer: L.Layer;
  layerType: string;
  originalEvent: Event;
  workingLayer?: L.Layer;
  shape?: string;
  cutLatLngs?: L.LatLng[];
}

export interface GeomanRotateEvent extends GeomanEvent {
  layer: L.Layer;
  layerType: string;
  originalEvent: Event;
  workingLayer?: L.Layer;
  shape?: string;
  rotationAngle?: number;
  rotationCenter?: L.LatLng;
}

// Drawing options
export interface GeomanDrawOptions {
  marker?: boolean;
  circle?: boolean;
  polygon?: boolean;
  polyline?: boolean;
  rectangle?: boolean;
  circlemarker?: boolean;
  text?: boolean;
  cut?: boolean;
  rotate?: boolean;
  
  // Global drawing options
  templineStyle?: L.PathOptions;
  hintlineStyle?: L.PathOptions;
  cursorMarker?: boolean;
  finishOnDoubleClick?: boolean;
  finishOn?: string | string[];
  snappable?: boolean;
  snapDistance?: number;
  allowSelfIntersection?: boolean;
  drawError?: {
    color?: string;
    timeout?: number;
    message?: string;
  };
  isLpm?: boolean;
  isRectangle?: boolean;
  isCircle?: boolean;
  isMarker?: boolean;
  isCircleMarker?: boolean;
  isPolyline?: boolean;
  isPolygon?: boolean;
  isText?: boolean;
}

// Editing options
export interface GeomanEditOptions {
  edit?: boolean;
  remove?: boolean;
  drag?: boolean;
  cut?: boolean;
  rotate?: boolean;
  
  // Global editing options
  snappable?: boolean;
  snapDistance?: number;
  allowSelfIntersection?: boolean;
  preventMarkerRemoval?: boolean;
  preventVertexEdit?: boolean;
  preventVertexRemoval?: boolean;
  preventVertexAddition?: boolean;
  preventVertexDrag?: boolean;
  preventVertexMove?: boolean;
  preventVertexResize?: boolean;
  preventVertexRotate?: boolean;
  preventVertexCut?: boolean;
}

// Removal options
export interface GeomanRemoveOptions {
  preventMarkerRemoval?: boolean;
  preventVertexRemoval?: boolean;
  preventVertexAddition?: boolean;
  preventVertexDrag?: boolean;
  preventVertexMove?: boolean;
  preventVertexResize?: boolean;
  preventVertexRotate?: boolean;
  preventVertexCut?: boolean;
}

// Cut options
export interface GeomanCutOptions {
  snappable?: boolean;
  snapDistance?: number;
  allowSelfIntersection?: boolean;
  preventMarkerRemoval?: boolean;
  preventVertexEdit?: boolean;
  preventVertexRemoval?: boolean;
  preventVertexAddition?: boolean;
  preventVertexDrag?: boolean;
  preventVertexMove?: boolean;
  preventVertexResize?: boolean;
  preventVertexRotate?: boolean;
  preventVertexCut?: boolean;
}

// Rotate options
export interface GeomanRotateOptions {
  snappable?: boolean;
  snapDistance?: number;
  allowSelfIntersection?: boolean;
  preventMarkerRemoval?: boolean;
  preventVertexEdit?: boolean;
  preventVertexRemoval?: boolean;
  preventVertexAddition?: boolean;
  preventVertexDrag?: boolean;
  preventVertexMove?: boolean;
  preventVertexResize?: boolean;
  preventVertexRotate?: boolean;
  preventVertexCut?: boolean;
}

// Text options
export interface GeomanTextOptions {
  text?: string;
  position?: 'center' | 'bottomleft' | 'bottomright' | 'topleft' | 'topright';
  offset?: [number, number];
  className?: string;
  style?: {
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    fontFamily?: string;
    textAlign?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    padding?: string;
  };
}

// Shape-specific options
export interface GeomanMarkerOptions extends L.MarkerOptions {
  draggable?: boolean;
  snappable?: boolean;
  snapDistance?: number;
  preventMarkerRemoval?: boolean;
}

export interface GeomanPolygonOptions extends L.PolygonOptions {
  snappable?: boolean;
  snapDistance?: number;
  allowSelfIntersection?: boolean;
  preventMarkerRemoval?: boolean;
  preventVertexEdit?: boolean;
  preventVertexRemoval?: boolean;
  preventVertexAddition?: boolean;
  preventVertexDrag?: boolean;
  preventVertexMove?: boolean;
  preventVertexResize?: boolean;
  preventVertexRotate?: boolean;
  preventVertexCut?: boolean;
}

export interface GeomanPolylineOptions extends L.PolylineOptions {
  snappable?: boolean;
  snapDistance?: number;
  allowSelfIntersection?: boolean;
  preventMarkerRemoval?: boolean;
  preventVertexEdit?: boolean;
  preventVertexRemoval?: boolean;
  preventVertexAddition?: boolean;
  preventVertexDrag?: boolean;
  preventVertexMove?: boolean;
  preventVertexResize?: boolean;
  preventVertexRotate?: boolean;
  preventVertexCut?: boolean;
}

export interface GeomanCircleOptions extends L.CircleOptions {
  snappable?: boolean;
  snapDistance?: number;
  preventMarkerRemoval?: boolean;
  preventVertexEdit?: boolean;
  preventVertexRemoval?: boolean;
  preventVertexAddition?: boolean;
  preventVertexDrag?: boolean;
  preventVertexMove?: boolean;
  preventVertexResize?: boolean;
  preventVertexRotate?: boolean;
  preventVertexCut?: boolean;
}

export interface GeomanRectangleOptions extends L.RectangleOptions {
  snappable?: boolean;
  snapDistance?: number;
  allowSelfIntersection?: boolean;
  preventMarkerRemoval?: boolean;
  preventVertexEdit?: boolean;
  preventVertexRemoval?: boolean;
  preventVertexAddition?: boolean;
  preventVertexDrag?: boolean;
  preventVertexMove?: boolean;
  preventVertexResize?: boolean;
  preventVertexRotate?: boolean;
  preventVertexCut?: boolean;
}

export interface GeomanCircleMarkerOptions extends L.CircleMarkerOptions {
  snappable?: boolean;
  snapDistance?: number;
  preventMarkerRemoval?: boolean;
  preventVertexEdit?: boolean;
  preventVertexRemoval?: boolean;
  preventVertexAddition?: boolean;
  preventVertexDrag?: boolean;
  preventVertexMove?: boolean;
  preventVertexResize?: boolean;
  preventVertexRotate?: boolean;
  preventVertexCut?: boolean;
}

// Toolbar options
export interface GeomanToolbarOptions {
  position?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
  
  // Drawing tools
  drawMarker?: boolean;
  drawPolygon?: boolean;
  drawPolyline?: boolean;
  drawCircle?: boolean;
  drawRectangle?: boolean;
  drawCircleMarker?: boolean;
  drawText?: boolean;
  
  // Editing tools
  editMode?: boolean;
  removalMode?: boolean;
  dragMode?: boolean;
  cutMode?: boolean;
  rotateMode?: boolean;
  
  // Customization
  drawText?: boolean;
  oneBlock?: boolean;
  drawPMButton?: boolean;
  editPMButton?: boolean;
  dragPMButton?: boolean;
  cutPMButton?: boolean;
  rotatePMButton?: boolean;
  removalPMButton?: boolean;
  
  // Styling
  buttonClass?: string;
  buttonClassActive?: string;
  buttonClassInactive?: string;
  buttonClassDisabled?: string;
  
  // Icons
  drawMarkerIcon?: string;
  drawPolygonIcon?: string;
  drawPolylineIcon?: string;
  drawCircleIcon?: string;
  drawRectangleIcon?: string;
  drawCircleMarkerIcon?: string;
  drawTextIcon?: string;
  editIcon?: string;
  dragIcon?: string;
  cutIcon?: string;
  rotateIcon?: string;
  removalIcon?: string;
  
  // Labels
  drawMarkerText?: string;
  drawPolygonText?: string;
  drawPolylineText?: string;
  drawCircleText?: string;
  drawRectangleText?: string;
  drawCircleMarkerText?: string;
  drawTextText?: string;
  editText?: string;
  dragText?: string;
  cutText?: string;
  rotateText?: string;
  removalText?: string;
}

// Global options
export interface GeomanGlobalOptions {
  // Drawing options
  templineStyle?: L.PathOptions;
  hintlineStyle?: L.PathOptions;
  cursorMarker?: boolean;
  finishOnDoubleClick?: boolean;
  finishOn?: string | string[];
  snappable?: boolean;
  snapDistance?: number;
  allowSelfIntersection?: boolean;
  drawError?: {
    color?: string;
    timeout?: number;
    message?: string;
  };
  
  // Editing options
  preventMarkerRemoval?: boolean;
  preventVertexEdit?: boolean;
  preventVertexRemoval?: boolean;
  preventVertexAddition?: boolean;
  preventVertexDrag?: boolean;
  preventVertexMove?: boolean;
  preventVertexResize?: boolean;
  preventVertexRotate?: boolean;
  preventVertexCut?: boolean;
  
  // UI options
  hideMiddleMarkers?: boolean;
  hideMiddleMarkersOnDrag?: boolean;
  hideMiddleMarkersOnEdit?: boolean;
  hideMiddleMarkersOnRemove?: boolean;
  hideMiddleMarkersOnCut?: boolean;
  hideMiddleMarkersOnRotate?: boolean;
  
  // Performance options
  limitMarkersToCount?: number;
  limitMarkersToZoom?: number;
  limitMarkersToBounds?: L.LatLngBounds;
  
  // Customization
  customControls?: boolean;
  customControlsClass?: string;
  customControlsPosition?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
  
  // Layer group
  layerGroup?: L.Layer;
}

// Event names for type safety
export type GeomanEventName = 
  | 'pm:create'
  | 'pm:edit'
  | 'pm:remove'
  | 'pm:drawstart'
  | 'pm:drawstop'
  | 'pm:drawvertex'
  | 'pm:editstart'
  | 'pm:editstop'
  | 'pm:editvertex'
  | 'pm:editmove'
  | 'pm:editresize'
  | 'pm:removestart'
  | 'pm:removestop'
  | 'pm:dragstart'
  | 'pm:drag'
  | 'pm:dragend'
  | 'pm:cutstart'
  | 'pm:cut'
  | 'pm:cutend'
  | 'pm:rotatestart'
  | 'pm:rotate'
  | 'pm:rotateend'
  | 'pm:globaldrawmodetoggled'
  | 'pm:globaldragmodetoggled'
  | 'pm:globalremovalmodetoggled'
  | 'pm:globalcutmodetoggled'
  | 'pm:globalrotatemodetoggled';

// Type guards for runtime type checking
export function isGeomanCreateEvent(event: any): event is GeomanCreateEvent {
  return event && event.type === 'pm:create' && event.layer;
}

export function isGeomanEditEvent(event: any): event is GeomanEditEvent {
  return event && event.type === 'pm:edit' && event.layer;
}

export function isGeomanRemoveEvent(event: any): event is GeomanRemoveEvent {
  return event && event.type === 'pm:remove' && event.layer;
}

export function isGeomanDragEvent(event: any): event is GeomanDragEvent {
  return event && event.type?.startsWith('pm:drag') && event.layer;
}

export function isGeomanCutEvent(event: any): event is GeomanCutEvent {
  return event && event.type?.startsWith('pm:cut') && event.layer;
}

export function isGeomanRotateEvent(event: any): event is GeomanRotateEvent {
  return event && event.type?.startsWith('pm:rotate') && event.layer;
}

// Layer type discrimination
export function isGeomanMarker(layer: L.Layer): layer is L.Marker {
  return layer instanceof L.Marker;
}

export function isGeomanPolygon(layer: L.Layer): layer is L.Polygon {
  return layer instanceof L.Polygon;
}

export function isGeomanPolyline(layer: L.Layer): layer is L.Polyline {
  return layer instanceof L.Polyline;
}

export function isGeomanCircle(layer: L.Layer): layer is L.Circle {
  return layer instanceof L.Circle;
}

export function isGeomanRectangle(layer: L.Layer): layer is L.Rectangle {
  return layer instanceof L.Rectangle;
}

export function isGeomanCircleMarker(layer: L.Layer): layer is L.CircleMarker {
  return layer instanceof L.CircleMarker;
}