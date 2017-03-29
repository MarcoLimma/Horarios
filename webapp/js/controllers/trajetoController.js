angular.module('app').controller('TrajetosCtrl', ['$scope', '$sce', '$window', 'AuthenticationService', "$http", "TrajetosService", "OnibusService",
    function TrajetosCtrl($scope, $sce, $window, AuthenticationService, $http, TrajetosService, OnibusService) {

        $scope.map = {
            control: {},
            center: {
                latitude: -22.5114113,
                longitude: -43.1827431
            },
            zoom: 15
        };

        $scope.pesquisa = {
            onibus: {},
        }

        var waypoint1 = {
            posicao: new google.maps.LatLng(-22.5213024, -43.1964261),
            nWaypoint: 0
        };
        var waypoint2 = {
            posicao: new google.maps.LatLng(-22.5203633, -43.194905),
            nWaypoint: 0
        };
        var waypoint3 = {
            posicao: new google.maps.LatLng(-22.5198167, -43.1944257),
            nWaypoint: 0
        };
        var waypoint4 = {
            posicao: new google.maps.LatLng(-22.5188112, -43.1923724),
            nWaypoint: 0
        };
        var waypoint5 = {
            posicao: new google.maps.LatLng(-22.5187114, -43.1911338),
            nWaypoint: 0
        };
        var waypoint6 = {
            posicao: new google.maps.LatLng(-22.5207528, -43.1892247),
            nWaypoint: 0
        };
        var waypoint7 = {
            posicao: new google.maps.LatLng(-22.5201625, -43.1880277),
            nWaypoint: 0
        };
        var waypoint8 = {
            posicao: new google.maps.LatLng(-22.5182006, -43.1862408),
            nWaypoint: 0
        };
        var waypoint9 = {
            posicao: new google.maps.LatLng(-22.5161192, -43.1832617),
            nWaypoint: 0
        };
        var waypoint10 = {
            posicao: new google.maps.LatLng(-22.5149519, -43.1819607),
            nWaypoint: 0
        };
        var waypoint11 = {
            posicao: new google.maps.LatLng(-22.5115425, -43.1783607),
            nWaypoint: 0
        };

        var waypoints1 = [];

        waypoints1.push(waypoint1);
        waypoints1.push(waypoint2);
        waypoints1.push(waypoint3);
        waypoints1.push(waypoint4);
        waypoints1.push(waypoint5);
        waypoints1.push(waypoint6);
        waypoints1.push(waypoint7);
        waypoints1.push(waypoint8);
        waypoints1.push(waypoint9);
        waypoints1.push(waypoint10);
        waypoints1.push(waypoint11);

        var ponto1 = {
            posicao: new google.maps.LatLng(-22.5091909, -43.1710863),
            nWaypoint: 0
        };
        var ponto2 = {
            posicao: new google.maps.LatLng(-22.5113056, -43.1839881),
            nWaypoint: 1
        };
        var ponto3 = {
            posicao: new google.maps.LatLng(-22.5135607, -43.1848623),
            nWaypoint: 1
        };
        var ponto4 = {
            posicao: new google.maps.LatLng(-22.5145073, -43.1851897),
            nWaypoint: 1
        };
        var ponto5 = {
            posicao: new google.maps.LatLng(-22.5156184, -43.1882224),
            nWaypoint: 1
        };
        var ponto6 = {
            posicao: new google.maps.LatLng(-22.5159129, -43.1898518),
            nWaypoint: 1
        };
        var ponto7 = {
            posicao: new google.maps.LatLng(-22.5172315, -43.1913954),
            nWaypoint: 1
        };
        var ponto8 = {
            posicao: new google.maps.LatLng(-22.5185902, -43.1916981),
            nWaypoint: 1
        };
        var ponto9 = {
            posicao: new google.maps.LatLng(-22.5193402, -43.1937602),
            nWaypoint: 2
        };
        var ponto10 = {
            posicao: new google.maps.LatLng(-22.5203456, -43.1948893),
            nWaypoint: 2
        };
        var ponto11 = {
            posicao: new google.maps.LatLng(-22.5212551, -43.1963846),
            nWaypoint: 2
        };
        var ponto12 = {
            posicao: new google.maps.LatLng(-22.5230785, -43.1983754),
            nWaypoint: 2
        };

        var pontos1 = [];

        pontos1.push(ponto1);
        pontos1.push(ponto2);
        pontos1.push(ponto3);
        pontos1.push(ponto4);
        pontos1.push(ponto5);
        pontos1.push(ponto6);
        pontos1.push(ponto7);
        pontos1.push(ponto8);
        pontos1.push(ponto9);
        pontos1.push(ponto10);
        pontos1.push(ponto11);
        pontos1.push(ponto12);

        $scope.listaOnibus = [];

        //db
        var onibus = {
            nome: "211 - Valparaiso",
            itinerarios: [{
                    sentido: "Centro",
                    arrayPos: 0,
                    origem: {
                        latitude: -22.5233068,
                        longitude: -43.1987031
                    },
                    destino: {
                        latitude: -22.50889,
                        longitude: -43.1723091
                    },
                    waypoints: [],
                    pontos: waypoints1,
                    horarios: [
                        "05:40",
                        "06:30",
                        "07:20",
                        "08:10",
                        "09:00",
                        "10:00",
                        "11:00",
                        "12:00",
                        "13:00",
                        "14:00",
                        "15:00",
                        "16:00",
                        "17:00",
                        "18:00",
                        "19:00",
                        "20:00",
                        "21:00",
                        "22:00",
                        "23:20"
                    ]
                },
                {
                    sentido: "Bairro",
                    arrayPos: 1,
                    origem: {
                        latitude: -22.50889,
                        longitude: -43.1723091
                    },
                    destino: {
                        latitude: -22.5233068,
                        longitude: -43.1987031
                    },
                    waypoints: [{
                            location: "-22.5103355,-43.1762725",
                        },
                        {
                            location: "-22.5185902,-43.191698099999996",
                        }
                    ],
                    pontos: pontos1,
                    horarios: [
                        "05:40",
                        "06:30",
                        "07:20",
                        "08:10",
                        "09:00",
                        "10:00"
                        // "11:00",
                        // "12:00",
                        // "13:00",
                        // "14:00",
                        // "15:00",
                        // "16:00",
                        // "17:00",
                        // "18:00",
                        // "19:00",
                        // "20:00",
                        // "21:00",
                        // "22:00",
                        // "23:20"
                    ]

                }
            ]
        }

        OnibusService.list().then(function (result) {
            console.log(result.data);
            $scope.listaOnibus = result.data;

        }, function (error) {
            console.log(error);
        });

        // instantiate google map objects for directions
        var directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true
        });
        var directionsService = new google.maps.DirectionsService();
        var geocoder = new google.maps.Geocoder();

        $scope.markers = [];
        $scope.InfoWindows = [];

        // directions object -- with defaults
        $scope.directions = {
            origin: "",
            destination: "",
            showList: false
        }

        $scope.clearMap = function () {

            for (var i = 0; i < $scope.markers.length; i++) {
                $scope.markers[i].setMap(null);
            }

        }

        // get directions using google maps api
        $scope.getDirections = function (onibus, itinerario, hora) {

            // onibus = JSON.parse(onibus);
            $scope.clearMap();

            var request = {
                origin: new google.maps.LatLng($scope.pesquisa.itinerario.origem.lat, $scope.pesquisa.itinerario.origem.lng),
                destination: new google.maps.LatLng($scope.pesquisa.itinerario.destino.lat, $scope.pesquisa.itinerario.destino.lng),
                travelMode: google.maps.DirectionsTravelMode.DRIVING,
                waypoints: $scope.pesquisa.itinerario.waypoints

            };

            directionsService.route(request, function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    directionsDisplay.setMap($scope.map.control.getGMap());
                    directionsDisplay.setPanel(document.getElementById('directionsList'));
                    $scope.directions.showList = true;

                    console.log("teste");
                    console.log(response);

                    var totalValues = {
                        distance: 0,
                        duration: 0
                    }


                    // var totalValues = $scope.calcTotalValues(response);
                    // totalValues.nPontos = onibus.itinerarios[sentido].pontos.length;

                    // $scope.calcTotalDuration(totalValues, function (realTotalDuration) {
                    //     hora = hora + ":00";
                    //     console.log(hora);
                    //     var time = hora.split(':');

                    //     var d = new Date(); // creates a Date Object using the clients current time

                    //     d.setHours(+time[0]); // set Time accordingly, using implicit type coercion
                    //     d.setMinutes(time[1]); // you can pass Number or String, it doesn't matter
                    //     d.setSeconds(time[2]);

                    //     totalValues.selectedHour = d;
                    //     totalValues.realTotalDuration = realTotalDuration;
                    //     console.log(totalValues);
                    // });

                    var startPinColor = "66ff33";
                    var middlePinColor = "cc0000";
                    var startPosition = new google.maps.LatLng(itinerario.origem.lat, itinerario.origem.lng);

                    var stringOrigin = itinerario.origem.lat + "," + itinerario.origem.lng;
                    // var stringDestination = onibus.itinerarios[sentido].destino.latitude + "," + onibus.itinerarios[sentido].destino.longitude;


                    $scope.addMarker(startPosition, 0, "Início " + onibus.nome, startPinColor, startPosition, [], 0, totalValues);

                    // onibus.itinerarios[sentido].pontos.forEach(function (element, index) {

                    //     var title = "Ponto " + index;

                    //     $scope.addMarker(element.posicao, index, title, middlePinColor, startPosition, onibus.itinerarios[sentido].waypoints, element.nWaypoint, totalValues);

                    // }, this);

                } else {
                    alert('Google route unsuccesfull!');
                }

                var endPosition = new google.maps.LatLng(itinerario.destino.lat, itinerario.destino.lng);

                $scope.addMarker(endPosition, 0, "Fim " + onibus.nome, startPinColor, startPosition, itinerario.waypoints, itinerario.waypoints.lenght, totalValues);
            });
        }


        $scope.addMarker = function (pos, index, _title, color, origin, waypoints, nWaypoint, totalValues) {


            var contentString =
                // '<div style="width: 120px; height: 72px; padding-left: 25px" id="content">' +
                '<div style="width: 280px; height: 120px; padding-left: 25px" id="content">' +
                '<div  id="bodyContent">' +
                'Previsto para:' +
                '<h1 style="margin-top: 8px !important" id="firstHeading" class="firstHeading"> </h1>' +
                'Pos:' + pos + ' Waypoints:' + nWaypoint + '<br>Dist:' + 0 +
                '</div>' +
                '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });


            var pinColor = color;
            var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                new google.maps.Size(21, 34),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34));

            var marker = new google.maps.Marker({
                position: pos,
                map: $scope.map.control.getGMap(),
                title: _title,
                icon: pinImage
            });
            marker.addListener('click', function () {
                console.log("o: " + origin + " d:" + marker.getPosition());
                $scope.getDirectionJson(origin, marker.getPosition(), waypoints, nWaypoint, function (distancia) {
                    console.log("distanciadistanciadistanciadistancia " + distancia);

                    $scope.InfoWindows.forEach(function (element) {
                        element.close();
                    });

                    var tempo = parseFloat((totalValues.realTotalDuration * parseFloat(distancia).toFixed(3)) / totalValues.distance).toFixed(0);

                    console.log(tempo);

                    var horaEstimada = new Date(totalValues.selectedHour.getTime() + tempo * 60000);

                    console.log(totalValues.selectedHour);

                    var horaEstimadaString = ((horaEstimada.getHours() < 10 ? '0' : '') + horaEstimada.getHours()) + ":" + ((horaEstimada.getMinutes() < 10 ? '0' : '') + horaEstimada.getMinutes())

                    contentString =
                        // '<div style="width: 120px; height: 72px; padding-left: 25px" id="content">' +
                        '<div style="width: 280px; height: 120px; padding-left: 25px" id="content">' +
                        '<div  id="bodyContent">' +
                        'Dados:' +
                        '<h1 style="margin-top: 8px !important" id="firstHeading" class="firstHeading"> </h1>' +
                        'Pos:' + pos + '<br>Waypoints:' + nWaypoint + '<br>Dist: ' + parseFloat(distancia).toFixed(3) + "m" + '<br>temp:' + tempo +
                        '<br>HORA ESTIMADA:' + horaEstimadaString +
                        '</div>' +
                        '</div>';
                    infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });

                    infowindow.open($scope.map.control.getGMap(), marker);

                    $scope.InfoWindows.push(infowindow);
                });


            });


            $scope.markers.push(marker);

        };

        $scope.getDirectionJson = function (origin, destination, waypoints, nWaypoint, callback) {

            var stringWaypoint = "";

            if (waypoints !== undefined) {
                for (var i = 0; i < nWaypoint; i++) {
                    if (i > 0) {
                        stringWaypoint += "|" + waypoints[i].location;
                    } else {
                        stringWaypoint = waypoints[i].location;
                    }
                };
            }

            var apiKey = "AIzaSyBLfzARjD3j6KsIj25dl_-YifKBBB_iPj4";
            var apiUrl = "https://maps.googleapis.com/maps/api/directions/json?";

            var url = apiUrl +
                "origin=" + origin.toString().replace('(', '').replace(')', '') +
                "&destination=" + destination.toString().replace('(', '').replace(')', '') +
                "&waypoints=" + stringWaypoint +
                "&key=" + apiKey;

            console.log(url);

            var encode = encodeURIComponent(url);

            console.log("Encode: " + encode);

            TrajetosService.get(encode).then(function (result) {
                console.log(result.data);
                var distancia = 0;
                result.data.routes[0].legs.forEach(function (element) {
                    distancia += element.distance.value / 1000;
                });
                console.log(distancia);

                return callback(distancia);

            }, function (error) {
                console.log(error);
            });
        }

        $scope.calcTotalValues = function (response) {
            var totalValues = {
                distance: 0,
                duration: 0
            }

            response.routes[0].legs.forEach(function (element) {
                totalValues.distance += element.distance.value / 1000;
                totalValues.duration += element.duration.value / 60;
            });

            return totalValues;
        }

        $scope.calcTotalDuration = function (totalValues, callback) {

            var tempoNoPonto = 0.5;
            var tempoNoPontoFinal = 5;
            var transito = 1;

            var tempoTotalNoPonto = totalValues.nPontos * tempoNoPonto;

            console.log(tempoTotalNoPonto);

            var realTotalDuration = 0;

            realTotalDuration += totalValues.duration + tempoTotalNoPonto + transito;

            return callback(realTotalDuration);
        }
    }
]);

angular.module('app').controller('TrajetoListCtrl', ['$scope', '$location', '$sce', '$window', 'AuthenticationService', 'toastr', 'OnibusService',
    function OnibusCtrl($scope, $location, $sce, $window, AuthenticationService, toastr, OnibusService) {

        $scope.frota = [];
        $scope.list = function () {
            OnibusService.list().then(function (result) {
                $scope.frota = result.data;
            }, function (error) {
                console.log(error);
            });
        }

        $scope.deleteOnibus = function deleteOnibus(id) {
            if (id != undefined) {
                OnibusService.delete(id).then(function (result) {
                    toastr.success('Ônibus deletado com sucesso!', 'Exclusão');
                    var frota = $scope.frota;
                    for (var onibusKey in frota) {
                        if (frota[onibusKey]._id == id) {
                            $scope.frota.splice(onibusKey, 1);
                            break;
                        }
                    }
                }, function (error) {
                    toastr.error('Erro! Status:' + error.status + ' - ' + error.statusText, 'Erro ao excluir');
                    console.log(error);
                });
            }
        }
    }
]);

angular.module('app').controller('TrajetoCreateCtrl', ['$scope', '$location', '$sce', '$window', 'AuthenticationService', 'toastr', 'OnibusService',
    function OnibusCtrl($scope, $location, $sce, $window, AuthenticationService, toastr, OnibusService) {

        $scope.map = {
            control: {},
            center: {
                latitude: -22.5114113,
                longitude: -43.1827431
            },
            zoom: 15
        };

        $scope.listaOnibus = [];

        OnibusService.list().then(function (result) {

            $scope.listaOnibus = result.data;

            $scope.initMap();

        }, function (error) {

            console.log(error);
        });

        var origem = null;
        var destino = null;
        var waypoints = [];


        $scope.initMap = function () {

            var map = $scope.map.control.getGMap();

            //Evento de click para adicionar os marcadores
            google.maps.event.addListener(map, 'click', function (event) {
                console.log(event.latLng.lat() + ", " + event.latLng.lng() + " - " + $scope.marcador);

                if ($scope.marcador == 1) {
                    addMarkerOrigem(event.latLng, map);
                }
                if ($scope.marcador == 2) {
                    addMarkerDestino(event.latLng, map);
                }
                if ($scope.marcador == 3) {
                    if (waypoints.length >= 7) {
                        alert("O número máximo de waypoints é 7");
                        toastr.warning('O número máximo de waypoints é 7.', 'Alerta');
                    } else {
                        addMarkerWaypoints(event.latLng, map);
                    }
                }
                if ($scope.marcador == undefined) {
                    alert("Selecione um tipo de marcador.");
                    toastr.warning('Selecione um tipo de marcador.', 'Alerta');
                }

                waypoints.forEach(function (obj) {
                    obj.addListener('rightclick', function (event) {
                        for (var waypointsKey in waypoints) {
                            if (waypoints[waypointsKey].getPosition() == event.latLng) {
                                waypoints[waypointsKey].setMap(null);
                                waypoints.splice(waypointsKey, 1);
                                break;
                            }
                        }
                    });
                });

            });
        }

        function addMarkerOrigem(location, map) {
            if (origem != null) {
                origem.setMap(null);
                var marker = new google.maps.Marker({
                    position: location,
                    label: 'O',
                    map: map
                });
                origem = marker;
            } else {
                var marker = new google.maps.Marker({
                    position: location,
                    label: 'O',
                    map: map
                });
                origem = marker;
            }
        }

        function addMarkerDestino(location, map) {
            if (destino != null) {
                destino.setMap(null);
                var marker = new google.maps.Marker({
                    position: location,
                    label: 'D',
                    map: map
                });
                destino = marker;
            } else {
                var marker = new google.maps.Marker({
                    position: location,
                    label: 'D',
                    map: map
                });
                destino = marker;
            }
        }

        function addMarkerWaypoints(location, map) {
            var startPinColor = "66ff33";
            var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + startPinColor,
                new google.maps.Size(21, 34),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34));

            var marker = new google.maps.Marker({
                position: location,
                map: map,
                label: (waypoints.length + 1).toString(),
            });

            waypoints.push(marker);
        }

        var directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true
        });
        var directionsService = new google.maps.DirectionsService();

        $scope.visualizar = function () {

            if (origem != null || destino != null) {

                var waypointsPos = [];

                waypoints.forEach(function (obj) {
                    waypointsPos.push({
                        location: obj.position,
                        stopover: true
                    })

                });

                var request = {
                    origin: origem.position,
                    destination: destino.position,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING,
                    waypoints: waypointsPos

                };

                directionsService.route(request, function (response, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setMap(null);
                        directionsDisplay.setDirections(response);
                        directionsDisplay.setMap($scope.map.control.getGMap());
                        // directionsDisplay.setPanel(document.getElementById('directionsList'));
                        // $scope.directions.showList = true;
                    }
                })
            } else {
                alert("Dados inconsistentes!");
                toastr.warning('Dados inconsistentes.', 'Alerta');
            }
        }

        $scope.salvar = function () {
            if ($scope.onibus == undefined || $scope.onibus == null || $scope.onibus.itinerario == undefined || $scope.onibus.itinerario == null) {
                console.log("nao é possivel salvar o trajeto");
            } else {

                var waypointsPos = [];

                waypoints.forEach(function (obj) {
                    waypointsPos.push({
                        location: obj.position,
                        stopover: true
                    })

                });

                $scope.onibus.itinerarios.forEach(function (itinerario) {
                    if (itinerario.sentido == $scope.onibus.itinerario.sentido) {
                        console.log(itinerario.sentido);
                        itinerario.origem = origem.position;
                        itinerario.destino = destino.position;
                        itinerario.waypoints = waypointsPos;
                    }
                })

                console.log($scope.onibus);

                OnibusService.update($scope.onibus).then(function (result) {
                    console.log(result);
                }, function (error) {
                    console.log(error);
                })
            }
        }
    }
]);