function initAutocomplete() {
  window.localStorage['zoom'] = 15;
  window.pos = {lat: 37.773972, lng:  -122.431297};
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      window.pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      main();
    }
  )}

  function main() {
    var map = new google.maps.Map(document.getElementById('map'), {

      center: {lat: window.pos.lat, lng: window.pos.lng},
      zoom: parseInt(window.localStorage['zoom']),
      mapTypeId: 'roadmap'
    });
    if (document.getElementById('pac-input') === null) {
      $('body').append('<input id="pac-input">')
      var input = document.getElementById('pac-input');
    } else {
      var input = document.getElementById('pac-input');
    }
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        // debugger
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };
        var infowindow = new google.maps.InfoWindow();

        var marker = new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location,
          address: place.formatted_address,
          // debugger
          rating: place.rating,
          price: place.price_level,
        });

        var myMark = new google.maps.Marker({
          position: window.pos,
          map: map,
          title: 'Hello World!',

        });
          markers.push(marker);

        google.maps.event.addListener(marker, 'mouseover', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, marker);
        });
        google.maps.event.addListener(marker, 'mouseout', function() {
          infowindow.close();
        });


        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      // console.log(markers.length);
      if (markers.length >= 17) {
        $('ul').empty();
      }
      markers.forEach((marker) => {
        function priceRange() {
          var i = 0;
          var result = '';
          while (i < parseInt(marker.rating)) {
            result += '⭐️';
            i++;
          }
          return result;
        }
          var a = marker;


        $('#list').append(`<li class='answer' onclick=toggle("${parseInt(Object.keys(marker.__e3_.mouseout)[0])}")
        id="${parseInt(Object.keys(marker.__e3_.mouseout)[0])}">
        <div><p>${marker.title}</p>
        <span class='hidden'>
          Address: ${marker.address} <br>
          Rating: ${marker.rating} <br>
          Price:  ${priceRange()}<br>
        </span></div></li>`)
      });
      map.fitBounds(bounds);
    });
  }
  main();


}
