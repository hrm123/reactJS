(function () {
    var app = angular.module('todosApp');
    app.controller('todosCtrl',['$scope', '$http', function ($scope,$http) {
        $scope.Todos = [];
        $scope.Error = false;
        $http({
            method: 'GET',
            url: 'https://www.example.com/api/v1/page',
            params: 'limit=10, sort_by=created:desc',
            headers: { 'Authorization': 'Token token=xxxxYYYYZzzz' }
        }).success(function (data) {
            // With the data succesfully returned, call our callback
            $scope.Todos = data;
        }).error(function () {
            $scope.Error = true;
        });
    }]);
})();