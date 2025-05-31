const autoGeoCheckbox = document.getElementById('autoGeo');
const manualBtn = document.getElementById('manualBtn');
const latitudeElem = document.getElementById('latitude');
const longitudeElem = document.getElementById('longitude');

let watchId = null;

function displayPosition(position) {
  const { latitude, longitude } = position.coords;
  latitudeElem.textContent = latitude.toFixed(6);
  longitudeElem.textContent = longitude.toFixed(6);
}

function handleError(error) {
  alert("Erreur de géolocalisation : " + error.message);
}

manualBtn.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(displayPosition, handleError);
});

autoGeoCheckbox.addEventListener('change', () => {
  if (autoGeoCheckbox.checked) {
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(displayPosition, handleError, {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 5000,
      });
    } else {
      alert("La géolocalisation n'est pas supportée par ce navigateur.");
    }
  } else {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
    }
  }
});