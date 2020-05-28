


export const displayMap = (locations) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmV3a296aW5za3kiLCJhIjoiY2thN3lrbjdqMDdxODJybzNndTU5dGg1cSJ9.HnplSif6NOcnDRDpN_gBGQ';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/andrewkozinsky/cka7zsbvy1q231ip83ss2smph',
        scrollZoom: false
        // center: [-118, 34],
        // zoom: 10,
        // interactive: false
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
        // Create marker
        const el = document.createElement('div');
        el.className = 'marker';

        // Add marker
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        })
        .setLngLat(loc.coordinates)
        .addTo(map);

        // App popup
        new mapboxgl.Popup({
            offset: 30
        })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
        .addTo(map);

        // Extend map bounds to include current location
        bounds.extend(loc.coordinates)
    });

    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
};