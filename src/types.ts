import type * as L from 'leaflet';

export type DrawEventMap<TLayer extends L.Layer = L.Layer, TProperties = unknown> = {
  onEdited?: (e: L.DrawEvents.Edited) => void;
  onDrawStart?: (e: L.DrawEvents.DrawStart) => void;
  onDrawStop?: (e: L.DrawEvents.DrawStop) => void;
  onDrawVertex?: (e: L.DrawEvents.DrawVertex) => void;
  onEditStart?: (e: L.DrawEvents.EditStart) => void;
  onEditMove?: (e: L.DrawEvents.EditMove) => void;
  onEditResize?: (e: L.DrawEvents.EditResize) => void;
  onEditVertex?: (e: L.DrawEvents.EditVertex) => void;
  onEditStop?: (e: L.DrawEvents.EditStop) => void;
  onDeleted?: (e: L.DrawEvents.Deleted) => void;
  onDeleteStart?: (e: L.DrawEvents.DeleteStart) => void;
  onDeleteStop?: (e: L.DrawEvents.DeleteStop) => void;
  onCreated?: (e: L.DrawEvents.Created & { layer: TLayer }) => void;
};

export type DrawOptions = {
  polyline?: L.DrawOptions.PolylineOptions | boolean;
  polygon?: L.DrawOptions.PolygonOptions | boolean;
  rectangle?: L.DrawOptions.RectangleOptions | boolean;
  circle?: L.DrawOptions.CircleOptions | boolean;
  marker?: L.DrawOptions.MarkerOptions | boolean;
  circlemarker?: L.DrawOptions.CircleMarkerOptions | boolean;
};

export interface EditControlProps<
  TLayer extends L.Layer = L.Layer,
  TProperties = unknown
> extends DrawEventMap<TLayer, TProperties> {
  onMounted?: (control: L.Control.Draw) => void;
  edit?: L.Control.EditOptions;
  draw?: DrawOptions;
  position?: L.ControlPosition;
  featureGroup?: L.FeatureGroup<TLayer>;
}

export type EditControlEventHandlers<TLayer extends L.Layer = L.Layer, TProperties = unknown> = DrawEventMap<
  TLayer,
  TProperties
>;

export type { L };


