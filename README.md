# React-Leaflet-Draw

React component build on top of [React-Leaflet](https://github.com/PaulLeCam/react-leaflet) that integrate [leaflet-draw](https://github.com/Leaflet/Leaflet.draw) feature.

## Install

```
npm install react-leaflet-draw
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
import { Map, TileLayer, FeatureGroup, Circle } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"

const Component = () => (
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
);
```

For more details on how to use this plugin check out the examples [example](examples).
- `npm run example:class` to compile the class example
- `npm run example:hooks` to compile and run the hooks example

You can pass more options on draw object, this informations can be found [here](https://github.com/Leaflet/Leaflet.draw#user-content-example-leafletdraw-config)

# Project Background & Extension

This repository is an extension of the original [react-leaflet-draw](https://github.com/alex3165/react-leaflet-draw) by @alex3165, adding more features, modern support, and ongoing improvements for future React and Leaflet versions.

It aims to provide a robust, actively maintained drawing/editing solution for React-Leaflet maps, with enhanced API, better TypeScript support, and community-driven features.

## Development Guidelines

- Fork the repository and create a feature branch for your changes.
- Run `npm run example:class` or `npm run example:hooks` to test your changes in the example apps.
- Use `npm run lint` to check code style before submitting PRs.
- Prefer updating both hooks and class examples when changing core APIs.
- For TypeScript changes, update type definitions in `src/index.d.ts` and hooks example as needed.
- All new features should be compatible with both hooks and class-based usage.
- Document new props or API changes in this README and in example files.

## Issue & Contribution Guidelines

- Please search existing issues before raising a new one.
- When reporting bugs, include reproduction steps and code snippets if possible.
- Feature requests should describe the use case and proposed API.
- Pull requests must be rebased on the latest master and pass linting/build checks.
- All contributions are welcome! See the [CONTRIBUTING.md](CONTRIBUTING.md) if available.

## License

This project is licensed under the ISC License (see `package.json`).

```
ISC License

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

## EditControl API

#### Props

|name            |type                        |description                                           |
|----------------|----------------------------|------------------------------------------------------|
|position        |string                      |control group position                                |
|draw            |object <DrawOptions>        |enable/disable draw controls                          |
|edit            |object <EditPolyOptions>    |enable/disable edit controls                          |
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
