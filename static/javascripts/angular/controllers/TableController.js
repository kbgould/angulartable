/**
 * Created by Keith.Gould on 4/30/15.
 */

(function() {

    var TableController = function ($scope) {

        'use strict';

        $scope.testValue = "Magic!";

    };

    TableController.$inject = ['$scope'];

    angular.module('appRouter').TableController = TableController;

}());