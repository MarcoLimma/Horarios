angular.module("app").controller('AdminCtrl', ['$scope', '$sce', '$window', 'AuthenticationService', 'toastr',
    function AdminCtrl($scope, $sce, $window, AuthenticationService, toastr) {

    }
]);

angular.module("app").controller('AdminUserCtrl', ['$scope', '$location', '$window', 'UserService', 'AuthenticationService', 'toastr',
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
            } else {
                $location.path("/admin/login");
            }
        }

        $scope.register = function register(username, password, passwordConfirm) {
            if (AuthenticationService.isAuthenticated) {
                toastr.warning('You already have a login.', 'Register alert');
                $location.path("/admin");
            } else {
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