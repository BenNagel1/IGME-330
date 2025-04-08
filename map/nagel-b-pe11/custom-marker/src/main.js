
function init() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmFuODA4M3JpdCIsImEiOiJjbTk2bGRnOWUxbmFtMm1vaGlzZDIzZno5In0.ZmMQ276MT65C1RKcoqO23g';

    //code from step 5 will go here

    const geojson = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-77.032, 38.913]
                },
                properties: {
                    title: 'Mapbox',
                    description: 'Washington, D.C.'
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-122.414, 37.776]
                },
                properties: {
                    title: 'Mapbox',
                    description: 'San Francisco, California'
                }
            },
            {
                type: "Feature",
                properties: {
                    title: 'Strong Museum of Play',
                    description: 'Rochester, New York'
                },
                geometry: {
                    coordinates: [
                        -77.59923373853944,
                        43.15107376538501
                    ],
                    "type": "Point"
                }
            }
        ]
    };

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-96, 37.8],
        zoom: 3
    });

    //code from step 6 will go here

    // add markers to map
    for (const feature of geojson.features) {

        // code from step 7-1 will go here

        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);  // Replace this line with code from step 7-2

        //code from step 8 will go here
        new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(
                        `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
                    )
            )
            .addTo(map);

    }
}

export { init };