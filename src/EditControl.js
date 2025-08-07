import Draw from 'leaflet-draw'; // eslint-disable-line
import isEqual from 'fast-deep-equal';
import React, { useRef, useEffect, useCallback } from 'react';
import { useLeafletContext } from '@react-leaflet/core';

import leaflet, { Map, Control } from 'leaflet';

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
};

function EditControl(props) {
  const context = useLeafletContext();
  const drawRef = useRef();
  const propsRef = useRef(props);

  // Update props ref when props change
  useEffect(() => {
    propsRef.current = props;
  });

  const onDrawCreate = useCallback((e) => {
    const { onCreated } = propsRef.current;
    const container = context.layerContainer || context.map;
    container.addLayer(e.layer);
    onCreated && onCreated(e);
  }, [context]);

  useEffect(() => {
    const { map } = context;
    const { 
      onMounted,
      onCreated,
      onDeleted,
      onEdited,
      onDrawStart,
      onDrawStop,
      onDrawVertex,
      onEditStart,
      onEditMove,
      onEditResize,
      onEditVertex,
      onEditStop,
      onDeleteStart,
      onDeleteStop
    } = props;

    // Create event handlers map
    const handlers = new Map();
    
    // Set up event handlers
    for (const [propName, eventName] of Object.entries(eventHandlers)) {
      if (props[propName]) {
        const handler = (evt) => {
          props[propName](evt);
        };
        handlers.set(eventName, handler);
        map.on(eventName, handler);
      }
    }

    // Set up draw create handler
    map.on(leaflet.Draw.Event.CREATED, onDrawCreate);
    
    // Create and add draw control
    drawRef.current = createDrawElement(props, context);
    map.addControl(drawRef.current);
    onMounted && onMounted(drawRef.current);

    // Cleanup function
    return () => {
      // Remove draw create handler
      map.off(leaflet.Draw.Event.CREATED, onDrawCreate);

      // Remove all event handlers
      for (const [eventName, handler] of handlers) {
        map.off(eventName, handler);
      }

      // Remove draw control
      if (drawRef.current) {
        drawRef.current.remove();
      }
    };
  }, [context, onDrawCreate]);

  // Handle draw/edit/position changes
  useEffect(() => {
    if (
      isEqual(props.draw, propsRef.current.draw) &&
      isEqual(props.edit, propsRef.current.edit) &&
      props.position === propsRef.current.position
    ) {
      return;
    }
    
    const { map } = context;

    if (drawRef.current) {
      drawRef.current.remove();
      drawRef.current = createDrawElement(props, context);
      drawRef.current.addTo(map);

      const { onMounted } = props;
      onMounted && onMounted(drawRef.current);
    }
  }, [props.draw, props.edit, props.position, context, props.onMounted]);

  return null;
}

function createDrawElement(props, context) {
  const { layerContainer } = context;
  const { draw, edit, position } = props;
  const options = {
    edit: {
      ...edit,
      featureGroup: layerContainer,
    },
  };

  if (draw) {
    options.draw = { ...draw };
  }

  if (position) {
    options.position = position;
  }

  return new Control.Draw(options);
}

export default EditControl;
