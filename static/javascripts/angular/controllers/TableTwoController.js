/**
 * Created by Keith.Gould on 4/30/15.
 */

(function() {

    'use strict';

    var TableTwoController = function ($scope, $injector) {

        var TableController = angular.module('appRouter').controller('TableController');

        $injector.invoke(TableController, this, { $scope: $scope });



    };

    TableTwoController.$inject = [ '$scope', '$injector' ];

    angular.module('appRouter')
        .controller('TableTwoController', TableTwoController);

}());
