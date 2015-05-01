/**
 * Created by Keith.Gould on 4/30/15.
 */

(function() {

    "use strict";

    var app = angular.module('appRouter', ['ngRoute', 'ngAnimate']);

    $.ajaxSetup({ cache: false });

    app.config(function($locationProvider, $routeProvider) {

        $routeProvider
            .when('/tableone', {
                templateUrl: 'partials/tableOne',
                controller: 'TableOneController'
            })
            .when('/tabletwo', {
                templateUrl: 'partials/tableTwo',
                controller: 'TableTwoController'
            })
            .when('/tablethree', {
                templateUrl: 'partials/tableThree',
                controller: 'TableThreeController'
            })
            .otherwise({redirectTo:'/tableone'});
    });

}());