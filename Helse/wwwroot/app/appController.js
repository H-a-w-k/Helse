
app.controller("appController",
    ["$scope",
        "healthFactory",
        "NgMap",
        function (
            $scope,
            healthFactory,
            NgMap) {

            $scope.click = function (response) {

                var latitude = response.latLng.lat();
                var longitude = response.latLng.lat();

                healthFactory.getStations(latitude, longitude)
                    .then(
                    function (stations) {
                        console.log(stations);
                        $scope.stations = stations;
                    });
            }
        }]
);