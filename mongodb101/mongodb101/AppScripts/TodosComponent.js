(function () {
        var app = angular.module('todosApp');
        app.component('todoComponent', {
            template: '<input type="text" ng-bind="$ctrl.TaskDescription" /><input type="button" ng-click="OnAdd($ctrl.TaskDescription)">Add</input>',
            //controller: todosComponentCtrl,
            bindings: {
                Tasks:'@',
                OnAdd:'&'
            },

        });
    /*
        app.controller('todosComponentCtrl'['$scope', '$http', function () {
            $scope.
        }]);*/
})();