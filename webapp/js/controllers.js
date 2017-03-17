var appControllers = angular.module('appControllers', []);

appControllers.controller('HomeCtrl', ['$scope', '$sce', '$window', 'AuthenticationService', 'toastr',
    function HomeCtrl($scope, $sce, $window, AuthenticationService, toastr) {

    }
]);

appControllers.controller('AdminCtrl', ['$scope', '$sce', '$window', 'AuthenticationService', 'toastr',
    function AdminCtrl($scope, $sce, $window, AuthenticationService, toastr) {

    }
]);

appControllers.controller('AdminUserCtrl', ['$scope', '$location', '$window', 'UserService', 'AuthenticationService', 'toastr',
    function AdminUserCtrl($scope, $location, $window, UserService, AuthenticationService, toastr) {

        //Admin User Controller (signIn, logOut)
        $scope.signIn = function signIn(username, password) {
            if (username != null && password != null) {

                UserService.signIn(username, password).then(function (result) {
                    AuthenticationService.isAuthenticated = true;
                    $window.sessionStorage.token = result.data.token;
                    $window.sessionStorage.currentUserId = result.data.id;
                    toastr.success('Welcome to administrator area.', 'Login successful');
                    $location.path("/admin");
                }, function (error) {
                    toastr.error('Please, check your data and try again. Status:' + error.status + ' - ' + error.statusText, 'Login error');
                    console.log(error);
                });
            }
        }

        $scope.logOut = function logOut() {
            if (AuthenticationService.isAuthenticated) {

                UserService.logOut().then(function (result) {
                    AuthenticationService.isAuthenticated = false;
                    delete $window.sessionStorage.token;
                    delete $window.sessionStorage.currentUserId;
                    toastr.success('Hasta la vista baby!', 'Logout successful');
                    $location.path("/");
                }, function (error) {
                    toastr.error('Error! Status:' + error.status + ' - ' + error.statusText, 'Register error');
                    console.log(error);
                });
            }
            else {
                $location.path("/admin/login");
            }
        }

        $scope.register = function register(username, password, passwordConfirm) {
            if (AuthenticationService.isAuthenticated) {
                toastr.warning('You already have a login.', 'Register alert');
                $location.path("/admin");
            }
            else {
                UserService.register(username, password, passwordConfirm).then(function (result) {
                    toastr.success('Congratulations ' + username + ', now you can login to access the admin area.', 'Register successful');
                    $location.path("/admin/login");
                }, function (error) {
                    toastr.error('Please, check your data and try again. Status:' + error.status + ' - ' + error.statusText, 'Register error');
                    console.log(error);
                });
            }
        }
    }
]);

appControllers.controller('OnibusCtrl', ['$scope', '$location', '$sce', '$window', 'AuthenticationService', 'toastr', 'OnibusService',
    function OnibusCtrl($scope, $location, $sce, $window, AuthenticationService, toastr, OnibusService) {

        $scope.frota = [];

        $scope.list = function list() {

            OnibusService.list().then(function (result) {

                console.log(result);

                $scope.frota = result.data;

            }, function (error) {

                console.log(error);
            });
        }

        $scope.create = function create(onibus) {
            if (AuthenticationService.isAuthenticated) {

                OnibusService.create(onibus.numero, onibus.nome, onibus.bairro).then(function (result) {

                    console.log(result);
                    toastr.success('Ônibus cadastrado com sucesso!', 'Cadastro');
                    $location.path("/admin/onibus");

                }, function (error) {
                    toastr.error('Error! Status:' + error.status + ' - ' + error.statusText, 'Erro ao inserir');
                    console.log(error);
                });
            }
            else {
                $location.path("/admin/login");
            }
        }

        $scope.deleteOnibus = function deleteOnibus(id) {
            if (id != undefined) {
                OnibusService.delete(id).then(function (result) {
                    console.log(result);
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

appControllers.controller('OnibusEditCtrl', ['$scope', '$routeParams', '$location', '$sce', '$window', 'AuthenticationService', 'toastr', 'OnibusService',
    function OnibusEditCtrl($scope, $routeParams, $location, $sce, $window, AuthenticationService, toastr, OnibusService) {

        $scope.onibus = {};

        var id = $routeParams.id;

        OnibusService.read(id).then(function (result) {
            $scope.onibus = result.data;
        }, function (error) {
            toastr.error('Não foi possivel carragar as informações.', 'Erro ao editar');
            $location.path("/admin/onibus");
        });

        $scope.save = function save(onibus) {
            if (onibus !== undefined
                && onibus.numero !== undefined && onibus.numero != ""
                && onibus.nome !== undefined && onibus.nome != ""
                && onibus.bairro !== undefined && onibus.bairro != "") {


                OnibusService.update(onibus).then(function (result) {
                    toastr.success('Ônibus editado com sucesso!', 'Editar');
                    $location.path("/admin/onibus");
                }, function (error) {
                    toastr.error('Erro! Status:' + error.status + ' - ' + error.statusText, 'Erro ao editar');
                    console.log(error);
                });
            }
        }
    }
]);