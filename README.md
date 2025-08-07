# React-Leaflet-Draw-Next

React component build on top of [React-Leaflet](https://github.com/PaulLeCam/react-leaflet) that integrate [leaflet-draw](https://github.com/Leaflet/Leaflet.draw) feature. This is the next-generation version with React 19 and react-leaflet v5 support.

## Install

```
npm install react-leaflet-draw-next
```

## Getting started

First, include leaflet & leaflet-draw styles in your project
```html
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css"/>
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css"/>
```
or by including
```
node_modules/leaflet/dist/leaflet.css
node_modules/leaflet-draw/dist/leaflet.draw.css
```

You might need to add one more rule missing in the current css:
```css
  .sr-only {
    display: none;
  }
```

It's important to wrap EditControl component into FeatureGroup component from `react-leaflet`.
The elements you draw will be added to this FeatureGroup layer, when you hit edit button only items in this layer will be edited.

```jsx
import { MapContainer, TileLayer, FeatureGroup, Circle } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw-next"

const Component = () => (
  <MapContainer center={[51.51, -0.06]} zoom={13}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    />
    <FeatureGroup>
      <EditControl
        position='topright'
        onEdited={this._onEditPath}
        onCreated={this._onCreate}
        onDeleted={this._onDeleted}
        draw={{
          rectangle: false
        }}
      />
      <Circle center={[51.51, -0.06]} radius={200} />
    </FeatureGroup>
  </MapContainer>
);
```

For more details on how to use this plugin check out the examples [example](examples).
- `npm run example:class` to compile the class example
- `npm run example:hooks` to compile and run the hooks example

You can pass more options on draw object, this informations can be found [here](https://github.com/Leaflet/Leaflet.draw#user-content-example-leafletdraw-config)

## React 19 and react-leaflet v5 Compatibility

This package is specifically designed for React 19 and react-leaflet v5. Key changes from the original react-leaflet-draw:

- Uses `MapContainer` instead of `Map`
- Requires passing the `featureGroup` prop to `EditControl` with the actual Leaflet FeatureGroup instance
- Compatible with the new hooks-based architecture of react-leaflet v5

## EditControl API

#### Props

|name            |type                        |description                                           |
|----------------|----------------------------|------------------------------------------------------|
|position        |string                      |control group position                                |
|draw            |object <DrawOptions>        |enable/disable draw controls                          |
|edit            |object <EditPolyOptions>    |enable/disable edit controls                          |
|featureGroup    |object                      |L.FeatureGroup instance (required for react-leaflet v5)|
|onEdited        |function                    |hook to leaflet-draw's `draw:edited` event            |
|onCreated       |function                    |hook to leaflet-draw's `draw:created` event           |
|onDeleted       |function                    |hook to leaflet-draw's `draw:deleted` event           |
|onMounted       |function                    |hook to leaflet-draw's `draw:mounted` event           |
|onEditStart     |function                    |hook to leaflet-draw's `draw:editstart` event         |
|onEditStop      |function                    |hook to leaflet-draw's `draw:editstop` event          |
|onDeleteStart   |function                    |hook to leaflet-draw's `draw:deletestart` event       |
|onDeleteStop    |function                    |hook to leaflet-draw's `draw:deletestop` event        |
|onDrawStart     |function                    |hook to leaflet-draw's `draw:drawstart` event         |
|onDrawStop      |function                    |hook to leaflet-draw's `draw:drawstop` event          |
|onDrawVertex    |function                    |hook to leaflet-draw's `draw:drawvertex` event        |
|onEditMove      |function                    |hook to leaflet-draw's `draw:editmove` event          |
|onEditResize    |function                    |hook to leaflet-draw's `draw:editresize` event          |
|onEditVertex    |function                    |hook to leaflet-draw's `draw:editvertex` event          |

#### Links to docs

* [Control position options](http://leafletjs.com/reference.html#control-positions)
* [DrawOptions](https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#drawoptions)
* [EditPolyOptions](https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#editpolyoptions)
* [Draw events](https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-event)
