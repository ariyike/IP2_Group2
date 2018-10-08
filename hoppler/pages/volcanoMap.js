//<script>
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

            $('#earthquakes').click(function () {
                // Set Google map  to its start state
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 2,
                    center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                    mapTypeId: 'terrain' // can be any valid type
                });
                $.ajax({
                    // The URL of the specific data required
                    url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson",

                    // Called if there is a problem loading the data
                    error: function () {
                        $('#info').html('<p>An error has occurred</p>');
                    },

                    // The data has succesfully loaded
                    success: function (data) {
                        $.each(data.features, function (key, val) {
                            // Get the lat and lng data for use in the markers
                            var coords = val.geometry.coordinates;
                            var latLng = new google.maps.LatLng(coords[1], coords[0]);
                            // Now create a new marker on the map
                            var marker = new google.maps.Marker({
                                position: latLng,
                                map: map,
                                label: val.properties.mag.toString() // Whatever label you like. This one is the magnitude of the earthquake
                            });
                            // Form a string that holds desired marker infoWindow content. The infoWindow will pop up when you click on a marker on the map
                            var infowindow = new google.maps.InfoWindow({
                                content: "<h3>" + val.properties.title + "</h3><p><a href='" + val.properties.url + "'>Details</a></p>"
                            });
                            marker.addListener('click', function (data) {
                                infowindow.open(map, marker); // Open the Google maps marker infoWindow
                            });
                        });

                    }
                });
            });
        });
//    </script>

    <!-- Need the following code for Google Maps. PLEASE INSERT YOUR OWN GOOGLE MAPS KEY BELOW -->
//    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDUjRBa2C5gS3B3lId-9m-FsoBFwJDB3UQ&callback=initMap">
//    </script>