import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const RecenterMap = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
        if (lat && lng) {
            map.setView([lat, lng], map.getZoom(), {
                animate: true
            });
        }
    }, [lat, lng, map]);
    return null;
};

const MapComponent = ({ lat, lng }) => {
    const customIcon = new Icon({
        iconUrl: "/map_pin.svg",
        iconSize: [38, 38]
    });
    
    return (
        <MapContainer center={[lat, lng]} zoom={10} className="z-[9] h-[500px] w-[750px] max-h-[100vh] max-w-[100vw] p-10 rounded-lg">
            <TileLayer
                attribution={`<a href='https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=14/${lat}/${lng}&layers=N'>Open full map</a> | &copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>`}
                url={`https://tile.openstreetmap.org/{z}/{x}/{y}.png`}
            />
            {lat && lng && <Marker position={[lat, lng]} icon={customIcon}></Marker>}
            <RecenterMap lat={lat} lng={lng} />
        </MapContainer>
    );
};

export default MapComponent;