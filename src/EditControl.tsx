import 'leaflet-draw';
import isEqual from 'fast-deep-equal';
import React, { useRef, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import * as L from 'leaflet';
import type { Control, ControlPosition, DrawEvents, DrawOptions } from 'leaflet';

const eventHandlers = {
  onEdited: 'draw:edited',
  onDrawStart: 'draw:drawstart',
  onDrawStop: 'draw:drawstop',
  onDrawVertex: 'draw:drawvertex',
  onEditStart: 'draw:editstart',
  onEditMove: 'draw:editmove',
  onEditResize: 'draw:editresize',
  onEditVertex: 'draw:editvertex',
  onEditStop: 'draw:editstop',
  onDeleted: 'draw:deleted',
  onDeleteStart: 'draw:deletestart',
  onDeleteStop: 'draw:deletestop',
} as const;

export interface EditControlProps<TLayer extends L.Layer = L.Layer> {
  onEdited?: (v: DrawEvents.Edited) => void;
  onDrawStart?: (v: DrawEvents.DrawStart) => void;
  onDrawStop?: (v: DrawEvents.DrawStop) => void;
  onDrawVertex?: (v: DrawEvents.DrawVertex) => void;
  onEditStart?: (v: DrawEvents.EditStart) => void;
  onEditMove?: (v: DrawEvents.EditMove) => void;
  onEditResize?: (v: DrawEvents.EditResize) => void;
  onEditVertex?: (v: DrawEvents.EditVertex) => void;
  onEditStop?: (v: DrawEvents.EditStop) => void;
  onDeleted?: (v: DrawEvents.Deleted) => void;
  onDeleteStart?: (v: DrawEvents.DeleteStart) => void;
  onDeleteStop?: (v: DrawEvents.DeleteStop) => void;
  onCreated?: (v: DrawEvents.Created & { layer: TLayer }) => void;
  onMounted?: (ctrl: Control.Draw) => void;
  edit?: Control.EditOptions;
  draw?: {
    polyline?: DrawOptions.PolylineOptions | boolean;
    polygon?: DrawOptions.PolygonOptions | boolean;
    rectangle?: DrawOptions.RectangleOptions | boolean;
    circle?: DrawOptions.CircleOptions | boolean;
    marker?: DrawOptions.MarkerOptions | boolean;
    circlemarker?: DrawOptions.CircleOptions | boolean;
  };
  position?: ControlPosition;
  featureGroup?: L.FeatureGroup<TLayer>;
}

function createDrawElement<TLayer extends L.Layer = L.Layer>(
  props: EditControlProps<TLayer>,
  featureGroup?: L.FeatureGroup<TLayer>
): Control.Draw {
  const { draw, edit, position } = props;
  const options: any = {
    edit: {
      ...(edit ?? {}),
      featureGroup,
    },
  };

  if (draw) {
    options.draw = { ...draw };
  }

  if (position) {
    options.position = position;
  }

  return new L.Control.Draw(options);
}

export default function EditControl<TLayer extends L.Layer = L.Layer>(
  props: EditControlProps<TLayer>
): null {
  const map = useMap();
  const drawRef = useRef<Control.Draw | null>(null);
  const propsRef = useRef(props);

  function onDrawCreate(e: DrawEvents.Created & { layer: TLayer }) {
    const { onCreated, featureGroup } = propsRef.current;
    if (featureGroup) {
      featureGroup.addLayer(e.layer);
    }
    onCreated && onCreated(e);
  }

  useEffect(() => {
    propsRef.current = props;
  }, [props]);

  useEffect(() => {
    const { onMounted, featureGroup } = props;

    const keys = Object.keys(eventHandlers) as Array<keyof typeof eventHandlers>;
    keys.forEach((key) => {
      const eventType = eventHandlers[key];
      map.on(eventType, (evt: L.LeafletEvent) => {
        const handlers = keys.filter((handler) => eventHandlers[handler] === evt.type);
        if (handlers.length === 1) {
          const handler = handlers[0] as keyof EditControlProps;
          const fn = (props as any)[handler] as ((e: any) => void) | undefined;
          fn && fn(evt);
        }
      });
    });

    map.on(L.Draw.Event.CREATED as any, onDrawCreate as any);
    drawRef.current = createDrawElement(props, featureGroup);
    map.addControl(drawRef.current);
    onMounted && onMounted(drawRef.current);

    return () => {
      map.off(L.Draw.Event.CREATED as any, onDrawCreate as any);
      keys.forEach((key) => {
        const eventType = eventHandlers[key];
        if ((props as any)[key]) {
          map.off(eventType);
        }
      });

      if (drawRef.current) {
        drawRef.current.remove();
      }
    };
  }, [
    props.onCreated,
    props.onDeleted,
    props.onEdited,
    props.featureGroup,
  ]);

  useEffect(() => {
    if (
      isEqual(props.draw, propsRef.current.draw) &&
      isEqual(props.edit, propsRef.current.edit) &&
      props.position === propsRef.current.position &&
      props.featureGroup === propsRef.current.featureGroup
    ) {
      return;
    }

    if (drawRef.current) {
      drawRef.current.remove();
    }
    drawRef.current = createDrawElement(props, props.featureGroup);
    drawRef.current.addTo(map as unknown as L.Map);

    const { onMounted } = props;
    onMounted && onMounted(drawRef.current);

    return () => {
      if (drawRef.current) {
        drawRef.current.remove();
      }
    };

  }, [
    props.draw,
    props.edit,
    props.position,
    props.featureGroup,
    props.onCreated,
    props.onDeleted,
    props.onEdited,
  ]);

  return null;
}