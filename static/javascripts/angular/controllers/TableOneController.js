/**
 * Created by Keith.Gould on 4/30/15.
 */

(function() {

    'use strict';

    var TableOneController = function ($scope, $injector) {

        var TableController = angular.module('appRouter').TableController;

        $injector.invoke(TableController, this, { $scope: $scope });



    };

    TableOneController.$inject = [ '$scope', '$injector' ];

    angular.module('appRouter')
        .controller('TableOneController', TableOneController);

}());
