import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import { useState } from 'react';

export default function Maps(props) {
    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    let a = null
    L.Marker.prototype.options.icon = DefaultIcon;

    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const map = useMapEvents({
          click() {
            map.locate()
          },
          locationfound(e) {
            setPosition(e.latlng);
            props.setGeoLocation(e.latlng);
            map.flyTo(e.latlng, map.getZoom())
          },
        })
        return position === null ? null : (
          <Marker position={position}>
            <Popup>Alamat kamu berdasarkan posisi kamu saat ini :)</Popup>
          </Marker>
        )
      }
    return (
        <MapContainer 
        className='h-64 my-8'
        center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker/>
        </MapContainer>
    )
}
