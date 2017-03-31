angular.module('app').controller('PontoCtrl', ['$scope', '$location', '$sce', '$window', 'AuthenticationService', 'toastr', 'OnibusService', 'PontoService',
    function PontoCtrl($scope, $location, $sce, $window, AuthenticationService, toastr, OnibusService, PontoService) {

        $scope.map = {
            control: {},
            center: {
                latitude: -22.5114113,
                longitude: -43.1827431
            },
            zoom: 15
        };

        var pontosAdicionados = [];
        var pontosRemovidos = [];

        $scope.carregarPontos = function () {

            PontoService.list().then(function (result) {

                $scope.initMap();
                console.log(result.data);
                $scope.DrawMarkers(result.data);

            }, function (error) {

                console.log(error);
            });
        }

        $scope.initMap = function () {

            var map = $scope.map.control.getGMap();

            //Evento de click para adicionar os marcadores
            google.maps.event.addListener(map, 'click', function (event) {
                addMarker(event.latLng, map);
            })
        }

        function addMarker(location, map) {
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });
            addListener(marker);
            var ponto = {
                localizacao: marker.getPosition()
            }
            pontosAdicionados.push(ponto);
            console.log(pontosAdicionados);
        }

        $scope.salvar = function () {
            PontoService.save(pontosAdicionados, pontosRemovidos).then(
                function(result){
                    pontosAdicionados = [];
                    pontosRemovidos = [];
                },
                function(error){
                    console.log(error);
                });
        }

        $scope.DrawMarkers = function (pontos) {

            var map = $scope.map.control.getGMap();

            pontos.forEach(function (element) {
                var marker = new google.maps.Marker({
                    position: element.localizacao,
                    map: map
                });
                marker._id = element._id;
                addListener(marker);
            });

        }

        var addListener = function (marker) {
            marker.addListener('rightclick', function (event) {
                marker.setMap(null);
                if (marker._id != undefined) {
                     var ponto = {
                        _id: marker._id,
                        localizacao: marker.getPosition()
                    }
                    pontosRemovidos.push(ponto);
                }
                console.log(pontosRemovidos);
            });
        }
    }
]);