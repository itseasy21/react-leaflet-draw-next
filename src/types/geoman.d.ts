import * as L from 'leaflet';

declare module 'leaflet' {
  interface Map {
    pm: GeomanMap;
  }
}

export interface GeomanMap {
  enable(): void;
  disable(): void;
  setPathOptions(options: any): void;
  setToolbarOptions(options: any): void;
  setDrawOptions(options: any): void;
  setEditOptions(options: any): void;
  setRemoveOptions(options: any): void;
  setCutOptions(options: any): void;
  setRotateOptions(options: any): void;
  setTextOptions(options: any): void;
  setCircleOptions(options: any): void;
  setRectangleOptions(options: any): void;
  setPolygonOptions(options: any): void;
  setPolylineOptions(options: any): void;
  setMarkerOptions(options: any): void;
  setCircleMarkerOptions(options: any): void;
  setGlobalOptions(options: any): void;
}

export interface GeomanEvent {
  layer: L.Layer;
  layerType: string;
  originalEvent: Event;
}

export interface GeomanCreateEvent extends GeomanEvent {
  layer: L.Layer;
  layerType: string;
  originalEvent: Event;
}

export interface GeomanEditEvent extends GeomanEvent {
  layer: L.Layer;
  layerType: string;
  originalEvent: Event;
}

export interface GeomanRemoveEvent extends GeomanEvent {
  layer: L.Layer;
  layerType: string;
  originalEvent: Event;
}

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
}

export interface GeomanEditOptions {
  edit?: boolean;
  remove?: boolean;
  drag?: boolean;
  cut?: boolean;
  rotate?: boolean;
}

export interface GeomanToolbarOptions {
  position?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
  drawMarker?: boolean;
  drawPolygon?: boolean;
  drawPolyline?: boolean;
  drawCircle?: boolean;
  drawRectangle?: boolean;
  drawCircleMarker?: boolean;
  drawText?: boolean;
  editMode?: boolean;
  removalMode?: boolean;
  dragMode?: boolean;
  cutMode?: boolean;
  rotateMode?: boolean;
}