
app.controller("appController",
    ["$scope",
        "healthFactory",
        "NgMap",
        function (
            $scope,
            healthFactory,
            NgMap) {

            var vm = this;
            NgMap.getMap().then(function (map) {
                vm.map = map;
            });

            var marker;

            $scope.click = function (res) {

                var latitude = res.latLng.lat();
                var longitude = res.latLng.lng();

                console.log(latitude, longitude);

                if (marker) {
                    marker.setMap(null);
                }

                marker = new google.maps.Marker({
                    position: res.latLng,
                    map:  vm.map,
                    draggable: false,
                    animation: google.maps.Animation.DROP
                });

                healthFactory.getStations(latitude, longitude)
                    .then(
                    function (stations) {
                        console.log(stations);
                        $scope.stations = stations;
                    });
            }
        }]
);