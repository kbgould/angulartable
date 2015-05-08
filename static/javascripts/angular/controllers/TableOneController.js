/**
 * Created by Keith.Gould on 4/30/15.
 */

(function() {

    'use strict';

    var TableOneController = function ($scope, $injector) {

        var TableController = angular.module('appRouter').TableController;

        $injector.invoke(TableController, this, { $scope: $scope });

        $scope.tableOne = {};

        $scope.tableOneColumns = [

            {name: 'currency', title: 'Currency', width: '140px' },
            {name: 'code', title: 'Code', width: '140px'},
            {name: 'country', title: 'Country', width: '140px' },
            {name: 'decimalPlaces', title: 'Decimal Places', width: '140px' }

        ];

        $scope.tableOneData = [

            {currency: 'US Dollar', code: 'USD', country: 'United States', decimalPlaces: '2'},
            {currency: 'Great British Pound', code: 'GBP', country: 'Great Britain', decimalPlaces: '2'},
            {currency: 'Czech Krown', code: 'CZK', country: 'Czech Republic', decimalPlaces: '2'},
            {currency: 'Australian Dollar', code: 'AUD', country: 'Australia', decimalPlaces: '2'},
            {currency: 'Danish Kroner', code: 'DKK', country: 'Denmark', decimalPlaces: '2'}

        ];

        $scope.editRow = function (rowNum) {

            $scope.tableOneData[rowNum].__editable = !$scope.tableOneData[rowNum].__editable;
            $scope.tableOne.rebuildTable();

        };

    };

    TableOneController.$inject = [ '$scope', '$injector' ];

    angular.module('appRouter')
        .controller('TableOneController', TableOneController);

}());
