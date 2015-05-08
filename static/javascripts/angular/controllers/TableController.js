/**
 * Created by Keith.Gould on 4/30/15.
 */

(function() {

    var TableController = function ($scope) {

        'use strict';

        $scope.testValue = "Magic!";

        $scope.safeDigest = function(scope) {
            if (!scope.$$phase && !scope.$root.$$phase) {
                scope.$apply();
            }
        };

        window.$scope = $scope;

    };

    TableController.$inject = ['$scope'];

    angular.module('appRouter').TableController = TableController;

}());