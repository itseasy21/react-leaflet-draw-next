import 'leaflet-draw';
import isEqual from 'fast-deep-equal';
import React from 'react';
import { useMap } from 'react-leaflet';
import * as L from 'leaflet';
import type { EditControlProps } from './types';

const eventHandlers = {
  onEdited: L.Draw.Event.EDITED,
  onDrawStart: L.Draw.Event.DRAWSTART,
  onDrawStop: L.Draw.Event.DRAWSTOP,
  onDrawVertex: L.Draw.Event.DRAWVERTEX,
  onEditStart: L.Draw.Event.EDITSTART,
  onEditMove: L.Draw.Event.EDITMOVE,
  onEditResize: L.Draw.Event.EDITRESIZE,
  onEditVertex: L.Draw.Event.EDITVERTEX,
  onEditStop: L.Draw.Event.EDITSTOP,
  onDeleted: L.Draw.Event.DELETED,
  onDeleteStart: L.Draw.Event.DELETESTART,
  onDeleteStop: L.Draw.Event.DELETESTOP,
} as const;

function createDrawElement<TLayer extends L.Layer, TProperties>(
  props: EditControlProps<TLayer, TProperties>,
  featureGroup?: L.FeatureGroup<TLayer>
): L.Control.Draw {
  const { draw, edit, position } = props;
  const options: L.Control.DrawConstructorOptions = {
    edit: {
      ...(edit ?? {}),
      featureGroup: featureGroup as unknown as L.FeatureGroup,
    },
  };

  if (draw) {
    // Cast is safe: keys align with L.Control.DrawOptions
    options.draw = { ...(draw as L.Control.DrawOptions) };
  }

  if (position) {
    options.position = position;
  }

  return new L.Control.Draw(options);
}

function EditControl<TLayer extends L.Layer = L.Layer, TProperties = unknown>(
  props: EditControlProps<TLayer, TProperties>
) {
  const map = useMap() as L.Map;
  const drawRef = React.useRef<L.Control.Draw | null>(null);
  const propsRef = React.useRef(props);

  const onDrawCreate = React.useCallback(
    (evt: L.LeafletEvent) => {
      const e = evt as L.DrawEvents.Created;
      const { onCreated, featureGroup } = props;
      if (featureGroup) {
        featureGroup.addLayer(e.layer);
      }
      onCreated && (onCreated as unknown as (e: L.LeafletEvent) => void)(e);
    },
    [props]
  );

  React.useEffect(() => {
    const { onMounted, featureGroup } = props;

    (Object.keys(eventHandlers) as Array<keyof typeof eventHandlers>).forEach((key) => {
      const eventType = eventHandlers[key];
      map.on(eventType, (evt: L.LeafletEvent) => {
        const maybeHandler = props[key] as ((e: L.LeafletEvent) => void) | undefined;
        if (maybeHandler) {
          maybeHandler(evt);
        }
      });
    });

    map.on(L.Draw.Event.CREATED, onDrawCreate);
    drawRef.current = createDrawElement(props, featureGroup);
    map.addControl(drawRef.current);
    onMounted && onMounted(drawRef.current);

    return () => {
      map.off(L.Draw.Event.CREATED, onDrawCreate);

      (Object.keys(eventHandlers) as Array<keyof typeof eventHandlers>).forEach((key) => {
        const eventType = eventHandlers[key];
        map.off(eventType);
      });

      if (drawRef.current) {
        drawRef.current.remove();
      }
    };
  }, [map, onDrawCreate, props]);

  React.useEffect(() => {
    if (
      isEqual(props.draw, propsRef.current.draw) &&
      isEqual(props.edit, propsRef.current.edit) &&
      props.position === propsRef.current.position &&
      props.featureGroup === propsRef.current.featureGroup
    ) {
      return undefined;
    }

    if (drawRef.current) {
      drawRef.current.remove();
    }
    drawRef.current = createDrawElement(props, props.featureGroup);
    drawRef.current.addTo(map);

    const { onMounted } = props;
    onMounted && onMounted(drawRef.current);

    return () => {
      if (drawRef.current) {
        drawRef.current.remove();
      }
    };
  }, [
    map,
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

export default EditControl;


