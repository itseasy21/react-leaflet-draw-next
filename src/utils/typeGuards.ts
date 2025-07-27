import * as L from 'leaflet';
import type {
  GeomanCreateEvent,
  GeomanEditEvent,
  GeomanRemoveEvent,
  GeomanDragEvent,
  GeomanCutEvent,
  GeomanRotateEvent,
} from '../types/geoman';

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