
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

                if (marker) {
                    marker.setMap(null);
                }

                marker = new google.maps.Marker({
                    position: res.latLng,
                    map: vm.map,
                    draggable: false,
                    animation: google.maps.Animation.DROP
                });

                $scope.stations = [];
                $scope.loadingStations = true;
                $scope.noStations = false;
                healthFactory.getStations(latitude, longitude)
                    .then(
                    function (stations) {
                        $scope.stations = stations;
                        $scope.noStations = stations.length === 0;
                    })
                    .finally(
                    function () {
                        $scope.loadingStations = false;
                    });
            }
        }]
);