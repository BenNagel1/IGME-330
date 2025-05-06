import * as map from "./map.js";

function init() {
    //code from step 6 will go here
    map.initMap();
    // add markers to map
    map.loadMarkers();
    map.addMarkersToMap();
    setupUI();
}

function setupUI() {
    map.setPitchAndBearing(0, 0);

    btn1.onclick = () => {
        map.setZoomLevel(1.5);
        map.flyTo([-30, 20]); // World
    };

    btn2.onclick = () => {
        map.setZoomLevel(6);
        map.flyTo([-119.5, 37.5]); // California
    };

    btn3.onclick = () => {
        map.setZoomLevel(6);
        map.flyTo([-121, 45.5]); // Oregon/Washington
    };

    btn4.onclick = () => {
        map.setZoomLevel(6.5);
        map.flyTo([-76, 42.8]); // New York
    };

    btn5.onclick = () => {
        map.setZoomLevel(6);
        map.flyTo([2.5, 46.8]); // France
    };

    btn6.onclick = () => {
        map.setZoomLevel(6);
        map.flyTo([-3.7, 40.4]); // Spain
    };

    btn7.onclick = () => {
        map.setZoomLevel(6);
        map.flyTo([-8.0, 39.5]); // Portugal
    };

    btn8.onclick = () => {
        map.setZoomLevel(5.5);
        map.flyTo([12.0, 42.0]); // Italy
    };

    btn9.onclick = () => {
        map.setZoomLevel(4);
        map.flyTo([-64.0, -33.0]); // South America (Chile & Argentina)
    };

    btn10.onclick = () => {
        map.setZoomLevel(6);
        map.flyTo([19.0, -33.5]); // South Africa
    };

    btn11.onclick = () => {
        map.setZoomLevel(3.5);
        map.flyTo([142.0, -30.0]); // Australia/New Zealand
    };
}

export { init };