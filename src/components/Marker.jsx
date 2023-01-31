import React from 'react'
import { Marker, useMap } from "react-leaflet";
const map = useMap();
export default function Marker(props) {
    return (
        <div>
          <Marker
            position={[33.91907336973602, 35.51552625946782]}
            eventHandlers={{
              click: (e) => {
                map.flyTo(e.latlng, 14);
              },
            }}
          ></Marker>
        </div>
      );
}
