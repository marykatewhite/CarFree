// Created the map and map settings to be displayed on the page.
  var map, marker;

  function createMap(){
    var options = {
      center: {lat: 41.850033, lng: -87.6500523},
      zoom: 13,
      styles: [
          {elementType: "geometry", stylers: [{color: "#ebe3cd"}]},
          {elementType: "labels.text.fill", stylers: [{color: "#523735"}]},
          {elementType: "labels.text.stroke", stylers: [{color: "#f5f1e6"}]},
          {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [{color: "#c9b2a6"}]
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "geometry.stroke",
            stylers: [{color: "#dcd2be"}]
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [{color: "#ae9e90"}]
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [{color: "#dfd2ae"}]
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{color: "#dfd2ae"}]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#93817c"}]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{color: "#a5b076"}]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{color: "#447530"}]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{color: "#f5f1e6"}]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [{color: "#fdfcf8"}]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{color: "#f8c967"}]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{color: "#e9bc62"}]
          },
          {
            featureType: "road.highway.controlled_access",
            elementType: "geometry",
            stylers: [{color: "#e98d58"}]
          },
          {
            featureType: "road.highway.controlled_access",
            elementType: "geometry.stroke",
            stylers: [{color: "#db8555"}]
          },
          {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [{color: "#806b63"}]
          },
          {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [{color: "#dfd2ae"}]
          },
          {
            featureType: "transit.line",
            elementType: "labels.text.fill",
            stylers: [{color: "#8f7d77" }]
          },
          {
            featureType: "transit.line",
            elementType: "labels.text.stroke",
            stylers: [{color: "#ebe3cd"}]
          },
          {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [{color: "#dfd2ae"}]
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{color: "#b9d3c2"}]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{color: "#92998d"}]
        },
        ]
    };


// stuck here....
    var directionsRenderer = new google.maps.DirectionsRenderer();

    map = new google.maps.Map(document.getElementById("mapDisplay"), options); 
    directionsRenderer.setMap(map);


    const directionObject = {
      origin: "Richmond,VA",
      destination: "Chicago, IL",
      travelMode: "WALKING",
  }
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(directionObject, function(result, status) { 
      if (status == 'OK') { 
        directionsRenderer.setDirections(result); 
        
        const duration = result.routes[0].legs[0].duration.text
        
        document.getElementById("arrivalOutput").innerHTML = duration;
      }
      }
      );
      
    var input = document.getElementById("inputDestination");
    var searchBox = new google.maps.places.SearchBox(input);

    map.addListener("bounds_changed" , function() {
      searchBox.setBounds(map.getBounds());
    });


    var markers = [];
     
    searchBox.addListener('places_changed' , function(){
      var places = seachbox.getPlaces();

      if (places.length === 0) 
        return;

    markers.forEach(function(m) { m.setMap(null); });
    markers = [];

    var bounds = new google.maps.LatLngBounds();

    places.forEach(function (p) {
      if (lp.geometery)
        return;

      markers.push(new google.maps.Marker({
        map: map,
        title: p.name,
        position: p.geometery.location 
      }));

      if (p.geometery.viewport)
        bounds.union(p.geometery.viewport);
      else
        bounds.extend(p.geometery.location);
    });
    map.fitBounds(bounds);
    })

// Getting current location info.
    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (p) {
        var position = {
          lat: p.coords.latitude,
          lng: p.coords.longitude
        };
        infoWindow.setPosition(position);
        infoWindow.setContent("You're here!")
        infoWindow.open(map);
      }, function () {
        handleLocationError('Geolocation service failed', map.center());
      })
    } else{
      handleLocationError('No Geolocation Avaiable' , map.center());
    }
}

function handleLocationError (content, position){
  infoWindow.setPosition(position);
  infoWindow.setContent(content);
  infoWindow.open(map);
}

  google.maps.event.addListener(map, 'click', function(event) {
  placeMarker(event.latLng);
});

