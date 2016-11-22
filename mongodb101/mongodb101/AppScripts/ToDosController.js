(function () {
    var app = angular.module('todosApp');
    app.controller('todosCtrl',['$scope', '$http', function ($scope,$http) {
        $scope.Todos = [];
        $scope.Error = false;
        $scope.OnAddTodo = function(taskDescription){
            alert(taskDescription);
        };

        $http({
            method: 'GET',
            url: 'http://localhost:2272/api/ToDos'
        }).success(function (data) {
            debugger;
            // With the data succesfully returned, call our callback
            $scope.Todos = data;
        }).error(function () {
            debugger;
            $scope.Error = true;
        });
    }]);
})();