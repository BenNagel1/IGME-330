import { coffeeShops } from "./coordinates.js";

let map;
let geojson = {
    type: 'FeatureCollection',
    features: []
};


function initMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmFuODA4M3JpdCIsImEiOiJjbTk2bGRnOWUxbmFtMm1vaGlzZDIzZno5In0.ZmMQ276MT65C1RKcoqO23g';

    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/standard-satellite',
        center: [-30, 20],
        zoom: 1.5
    });
}

function addMarkersToMap() {
    for (const feature of geojson.features) {
        addMarker(feature.geometry.coordinates, feature.properties.title, feature.properties.description, 'marker');
    }
}

function loadMarkers() {
    // now convert this data to GeoJSON
    for (let shop of coffeeShops) {
        const newFeature = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: []
            },
            properties: {
                title: "",
                description: ""
            }
        };
        
        newFeature.geometry.coordinates[0] = shop.longitude;
        newFeature.geometry.coordinates[1] = shop.latitude;
        newFeature.properties.title = shop.title;
        newFeature.properties.description = shop.description;

        geojson.features.push(newFeature);
    }

    console.log(geojson.features);
}

function flyTo(center = [0, 0]){
    map.flyTo({center: center});
}

function setZoomLevel(value = 0){
    map.setZoom(value);
}

function setPitchAndBearing(pitch=0, bearing=0){
    map.setPitch(pitch);
    map.setBearing(bearing);
}

function addMarker(coordinates, title, description, className){
    let el = document.createElement('div');
    el.className = className;

    new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML('<h3>' + title + '</h3><p>' + description + '</p>'))
        .addTo(map);
}

export {initMap,loadMarkers,addMarkersToMap,flyTo,setZoomLevel,setPitchAndBearing, addMarker};