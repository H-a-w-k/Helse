app.factory("healthFactory",
    ["$http",
        "$q",
        function (
            $http,
            $q) {

            /**
             * Returns a list over stations in the area close to the position given.
             * 
             * @param {any} latitude
             * @param {any} longitude
             */
            function getStations(latitude, longitude) {

                var url = "api/app?latitude=" + latitude + "&longitude=" + longitude;

                return $http(
                    {
                        method: "GET",
                        url: url
                    }
                )
                    .then(
                    function (result) {
                        return result.data;
                    });
            }

            return {
                getStations: getStations
            }
        }]
);