var map;
        //initMap() called when Google Maps API code is loaded - when web page is opened/refreshed 
        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
        }

        var thelocation;
        var titleName;
        $(document).ready(function () {

            $('#volcanoes').click(function () {
                // Set Google map  to its start state
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 2,
                    center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                    mapTypeId: 'terrain' // can be any valid type
                });
                // The following uses JQuery library
                $.ajax({
                    // The URL of the specific data required
                    url: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_populated_places_simple.geojson",

                    // Called if there is a problem loading the data
                    error: function () {
                        $('#info').html('<p>An error has occurred</p>');
                    },
                    // Called when the data has succesfully loaded
                    success: function (data) {
                        i = 0;
                        var markers = []; // keep an array of Google Maps markers, to be used by the Google Maps clusterer
                        $.each(data.features, function (key, val) {
                            // Get the lat and lng data for use in the markers
                            var coords = val.geometry.coordinates;
                            var latLng = new google.maps.LatLng(coords[1], coords[0]);
                            // Now create a new marker on the map
                            var marker = new google.maps.Marker({
                                position: latLng,
                                map: map
                            });
                            markers[i++] = marker; // Add the marker to array to be used by clusterer
                            //------
                             marker.addListener('click', function (data) {
                                infowindow.open(map, marker); // Open the Google maps marker infoWindow
                            });
                            
                            // Form a string that holds desired marker infoWindow content. The infoWindow will pop up when you click on a marker on the map
                            var infowindow = new google.maps.InfoWindow({
                                content: "<h3>" + val.properties.name + " is a city in " +val.properties.adm0name+" with a population of " +val.properties.pop_max+ "</h3><p><a href='https://en.wikipedia.org/wiki/" + val.properties.name + "' target='_blank'>learn more here</a></p>"
                            });
                            //-----
                        });
                        var markerCluster = new MarkerClusterer(map, markers,
                            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
                    }
                });
            });
        });