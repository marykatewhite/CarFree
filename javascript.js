if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(displayLocationInfo);
}

function displayLocationInfo(position) {
  const long = position.coords.longitude;
  const lati = position.coords.latitude;

  

  console.log(`longitude: ${ long } | latitude: ${ lati }`);
}


function initMap() {
  map = new google.maps.Map(document.getElementById('mapDisplay'), {
    center: {lat: 41.850033, lng: -87.6500523},
    zoom: 3
  });
}

