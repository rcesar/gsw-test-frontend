App.controller('SignController', function ($scope, $rootScope, $http, userService) {
    $scope.sign = {
        name:'',
        user:'',
        password:'',
        balance:0
    };

    $scope.send = function () {
        $http.post('http://localhost:3000/api/auth/sign', $scope.sign).then(function (data) {
            userService.setInfos(data.data);
            $rootScope.go('app.home');
        }).catch(function (err) {
            swal({
                title: 'Houve um Problema',
                text: err.data.message,
                type: 'error'
            })
        })
    }
});