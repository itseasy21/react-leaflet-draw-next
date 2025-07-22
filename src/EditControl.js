import { PropTypes } from 'prop-types';
import 'leaflet-draw'; // eslint-disable-line
import isEqual from 'fast-deep-equal';
import React, { useRef, useMemo } from 'react';
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
  // Enhanced context safety for React 19
  let context;
  try {
    context = useLeafletContext();
  } catch (error) {
    // Fallback for when context is not available
    if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
      console.error('EditControl must be used within a MapContainer:', error);
    }
    return null; // Gracefully return null instead of throwing
  }

  if (!context || !context.map) {
    if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
      console.warn('EditControl: MapContainer context not ready');
    }
    return null;
  }

  const drawRef = useRef();
  const propsRef = useRef(props);

  // Memoize the onDrawCreate callback to prevent unnecessary re-renders
  function onDrawCreate(e) {
    const { onCreated } = props;
    if (context && (context.layerContainer || context.map)) {
      const container = context.layerContainer || context.map;
      container.addLayer(e.layer);
    }
    onCreated && onCreated(e);
  }

  // Memoize event handler setup for React 19 strict mode compatibility
  const eventHandlerKeys = useMemo(() => Object.keys(eventHandlers), []);

  React.useEffect(() => {
    if (!context || !context.map) {
      return;
    }

    const { map } = context;
    const { onMounted } = props;

    // Set up event handlers with proper cleanup tracking
    const eventCleanupFunctions = [];

    eventHandlerKeys.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(eventHandlers, key)) {
        function eventHandler(evt) {
          const handlers = eventHandlerKeys.filter(
            (handler) => eventHandlers[handler] === evt.type
          );
          if (handlers.length === 1) {
            const handler = handlers[0];
            props[handler] && props[handler](evt);
          }
        }
        
        map.on(eventHandlers[key], eventHandler);
        eventCleanupFunctions.push(() => map.off(eventHandlers[key], eventHandler));
      }
    });

    map.on(leaflet.Draw.Event.CREATED, onDrawCreate);
    eventCleanupFunctions.push(() => map.off(leaflet.Draw.Event.CREATED, onDrawCreate));

    drawRef.current = createDrawElement(props, context);
    map.addControl(drawRef.current);
    onMounted && onMounted(drawRef.current);

    return () => {
      // Clean up all event listeners
      eventCleanupFunctions.forEach(cleanup => cleanup());
      
      // Remove draw control safely
      if (drawRef.current && map) {
        try {
          drawRef.current.remove(map);
        } catch (removeError) {
          if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
            console.warn('Error removing draw control:', removeError);
          }
        }
      }
    };
  }, [onDrawCreate, context, eventHandlerKeys, props.onMounted]);

  React.useEffect(() => {
    if (
      isEqual(props.draw, propsRef.current.draw) &&
      isEqual(props.edit, propsRef.current.edit) &&
      props.position === propsRef.current.position
    ) {
      return;
    }

    if (!context || !context.map) {
      return;
    }

    const { map } = context;

    // Safely remove existing control
    if (drawRef.current) {
      try {
        drawRef.current.remove(map);
      } catch (removeError) {
        if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
          console.warn('Error removing existing draw control:', removeError);
        }
      }
    }

    drawRef.current = createDrawElement(props, context);
    drawRef.current.addTo(map);

    const { onMounted } = props;
    onMounted && onMounted(drawRef.current);

    // Update props ref for next comparison
    propsRef.current = props;

    return () => {
      if (drawRef.current && map) {
        try {
          drawRef.current.remove(map);
        } catch (removeError) {
          if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
            console.warn('Error removing draw control on cleanup:', removeError);
          }
        }
      }
    };
  }, [
    props.draw, 
    props.edit, 
    props.position, 
    props.onMounted,
    context
  ]);

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

EditControl.propTypes = {
  ...Object.keys(eventHandlers).reduce((acc, val) => {
    acc[val] = PropTypes.func;
    return acc;
  }, {}),
  onCreated: PropTypes.func,
  onMounted: PropTypes.func,
  draw: PropTypes.shape({
    polyline: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    polygon: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    rectangle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    circle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    marker: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    circlemarker: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  }),
  edit: PropTypes.shape({
    edit: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    remove: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    poly: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    allowIntersection: PropTypes.bool,
  }),
  position: PropTypes.oneOf([
    'topright',
    'topleft',
    'bottomright',
    'bottomleft',
  ]),
  leaflet: PropTypes.shape({
    map: PropTypes.instanceOf(Map),
    layerContainer: PropTypes.shape({
      addLayer: PropTypes.func.isRequired,
      removeLayer: PropTypes.func.isRequired,
    }),
  }),
};

export default EditControl;
