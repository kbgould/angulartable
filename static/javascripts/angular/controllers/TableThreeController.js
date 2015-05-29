/**
 * Created by Keith.Gould on 4/30/15.
 */

(function() {

    'use strict';

    var TableThreeController = function ($scope, $injector) {

        var TableController = angular.module('appRouter').TableController;

        $injector.invoke(TableController, this, { $scope: $scope });

        $scope.tableThree = {};

        $scope.tableThreeColumns = [

            {name: 'currency', title: 'Currency', width: '140px' },
            {name: 'code', title: 'Code', width: '140px'},
            {name: 'country', title: 'Country', width: '140px' },
            {name: 'decimalPlaces', title: 'Decimal Places', width: '140px' }

        ];

        $scope.tableThreeData = [

            {currency: 'US Dollar', code: 'USD', country: 'United States', decimalPlaces: '2'},
            {currency: 'Great British Pound', code: 'GBP', country: 'Great Britain', decimalPlaces: '2'},
            {currency: 'Czech Krown', code: 'CZK', country: 'Czech Republic', decimalPlaces: '2'},
            {currency: 'Australian Dollar', code: 'AUD', country: 'Australia', decimalPlaces: '2'},
            {currency: 'Danish Kroner', code: 'DKK', country: 'Denmark', decimalPlaces: '2'}

        ];

        $scope.editRow = function (rowNum) {

            $scope.tableThreeData[rowNum].__editable = !$scope.tableThreeData[rowNum].__editable;
            $scope.tableThree.rebuildTable();

        };

    };

    TableThreeController.$inject = [ '$scope', '$injector' ];

    angular.module('appRouter')
        .controller('TableThreeController', TableThreeController);

}());
