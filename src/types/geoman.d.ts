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