var map = L.map('map');
let userMarker;

map.on('locationfound', function(e) {
    var radius = e.accuracy / 2;
    map.flyTo(e.latlng, 13);
    if (userMarker) {
        map.removeLayer(userMarker);
    }
    const userIcon = L.divIcon({
        className: 'user-marker',
        iconSize: [20, 20]
    });
    userMarker = L.marker(e.latlng, { icon: userIcon }).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();
});

map.on('locationerror', function(e) {
    alert(e.message);
    map.setView([51.505, -0.09], 13);
});

map.locate({setView: true, maxZoom: 16});


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let incidentMarkers = [];

async function loadIncidents() {
    const response = await fetch('/incidents');
    const incidents = await response.json();

    // Clear existing incident markers
    incidentMarkers.forEach(marker => map.removeLayer(marker));
    incidentMarkers = [];

    incidents.forEach(incident => {
        const incidentIcon = L.divIcon({
            className: 'incident-marker',
            html: '📍',
            iconSize: [30, 30]
        });
        const marker = L.marker([incident.lat, incident.lng], { icon: incidentIcon }).addTo(map);
        let popupContent = `<b>${incident.description}</b>`;
        if (incident.mediaPath) {
            if (incident.mediaPath.endsWith('.mp4') || incident.mediaPath.endsWith('.webm') || incident.mediaPath.endsWith('.ogg')) {
                popupContent += `<br><video width="200" controls><source src="${incident.mediaPath}" type="video/mp4">Your browser does not support the video tag.</video>`;
            } else {
                popupContent += `<br><img src="${incident.mediaPath}" width="200">`;
            }
        }
        marker.bindPopup(popupContent);
        incidentMarkers.push(marker);
    });
}

const reportButton = document.getElementById('report-button');

reportButton.addEventListener('click', () => {
    map.locate({
        setView: false,
        maxZoom: 16,
        watch: false,
        enableHighAccuracy: true
    }).on('locationfound', function(e){
        window.location.href = `/report.html?lat=${e.latitude}&lng=${e.longitude}`;
    }).on('locationerror', function(e){
        alert("Location access denied. Please enable location services to report an incident.");
    });
});

loadIncidents();
