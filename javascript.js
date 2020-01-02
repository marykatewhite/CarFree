var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('mapDisplay'), {
    center: {lat: 37.540, lng: -77.434},
    zoom: 13
  });
}

