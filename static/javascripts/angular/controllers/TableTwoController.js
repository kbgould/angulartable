/**
 * Created by Keith.Gould on 4/30/15.
 */

(function() {

    'use strict';

    var TableTwoController = function ($scope, $injector, $window) {

        var TableController = angular.module('appRouter').TableController;

        $injector.invoke(TableController, this, { $scope: $scope });

        $scope.tableTwo = {};

        $scope.tableTwoColumns = [

            {name: 'currency', title: 'Currency', width: '140px' },
            {name: 'code', title: 'Code', width: '140px'},
            {name: 'country', title: 'Country', width: '140px' },
            {name: 'decimalPlaces', title: 'Decimal Places', width: '140px' }

        ];

        $scope.tableTwoData = [

            {currency: 'US Dollar', code: 'USD', country: 'United States', decimalPlaces: '2'},
            {currency: 'Great British Pound', code: 'GBP', country: 'Great Britain', decimalPlaces: '2'},
            {currency: 'Czech Krown', code: 'CZK', country: 'Czech Republic', decimalPlaces: '2'},
            {currency: 'Australian Dollar', code: 'AUD', country: 'Australia', decimalPlaces: '2'},
            {currency: 'Danish Kroner', code: 'DKK', country: 'Denmark', decimalPlaces: '2'}

        ];

        $window.editRow = function (rowNum) {

            $scope.tableTwoData[rowNum].__editable = !$scope.tableTwoData[rowNum].__editable;
            $scope.tableTwo.rebuildTable();

        };


    };

    TableTwoController.$inject = [ '$scope', '$injector', '$window' ];

    angular.module('appRouter')
        .controller('TableTwoController', TableTwoController);

}());
