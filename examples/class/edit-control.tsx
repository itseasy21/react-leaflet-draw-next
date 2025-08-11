import React, { Component, createRef } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import * as L from 'leaflet';
import { EditControl } from '../../src';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png',
});

export default class EditControlExample extends Component<{ onChange?: (g: any) => void }> {
  featureGroupRef = createRef<L.FeatureGroup>();

  _onEdited = (e: L.DrawEvents.Edited) => {
    let numEdited = 0;
    e.layers.eachLayer(() => {
      numEdited += 1;
    });
    // eslint-disable-next-line no-console
    console.log(`_onEdited: edited ${numEdited} layers`, e);
    this._onChange();
  };

  _onCreated = (e: L.DrawEvents.Created) => {
    const type = e.layerType;
    // eslint-disable-next-line no-console
    console.log('_onCreated:', type, e);
    this._onChange();
  };

  _onDeleted = (e: L.DrawEvents.Deleted) => {
    let numDeleted = 0;
    e.layers.eachLayer(() => {
      numDeleted += 1;
    });
    // eslint-disable-next-line no-console
    console.log(`onDeleted: removed ${numDeleted} layers`, e);
    this._onChange();
  };

  _onMounted = (drawControl: L.Control.Draw) => {
    // eslint-disable-next-line no-console
    console.log('_onMounted', drawControl);
  };

  _onEditStart = (e: L.DrawEvents.EditStart) => {
    // eslint-disable-next-line no-console
    console.log('_onEditStart', e);
  };

  _onEditStop = (e: L.DrawEvents.EditStop) => {
    // eslint-disable-next-line no-console
    console.log('_onEditStop', e);
  };

  _onDeleteStart = (e: L.DrawEvents.DeleteStart) => {
    // eslint-disable-next-line no-console
    console.log('_onDeleteStart', e);
  };

  _onDeleteStop = (e: L.DrawEvents.DeleteStop) => {
    // eslint-disable-next-line no-console
    console.log('_onDeleteStop', e);
  };

  render() {
    const fgInstance = this.featureGroupRef.current as unknown as L.FeatureGroup | undefined;
    return (
      <MapContainer center={[37.8189, -122.4786]} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup ref={this.featureGroupRef as any}>
          {fgInstance && (fgInstance as any)._leaflet_id && (
            <EditControl
              position="topright"
              onEdited={this._onEdited}
              onCreated={this._onCreated}
              onDeleted={this._onDeleted}
              onMounted={this._onMounted}
              onEditStart={this._onEditStart}
              onEditStop={this._onEditStop}
              onDeleteStart={this._onDeleteStart}
              onDeleteStop={this._onDeleteStop}
              draw={{
                rectangle: false,
              }}
              featureGroup={fgInstance}
            />
          )}
        </FeatureGroup>
      </MapContainer>
    );
  }

  _editableFG: L.FeatureGroup | null = null;

  _onChange = () => {
    const { onChange } = this.props;
    if (!this._editableFG || !onChange) return;
    const geojsonData = (this._editableFG as any).toGeoJSON();
    onChange(geojsonData);
  };
}


