/**
 * Created by Keith.Gould on 4/30/15.
 */

(function() {
    'use strict';

    var cacheService = function($http, $q) {

        var factory = {};

        var resourceMap = {
            "Currencies": {
                location: "api/currencies",
                cache: undefined
            },
            "Countries": {
                location: "api/countries",
                cache: undefined
            }
        };

        factory.getCurrencies = function() {
            return getResourcePromise("Currencies", false);
        };

        factory.getCurrenciesFromServer = function() {
            return getResourcePromise("Currencies", true);
        };

        factory.getCountries = function() {
            return getResourcePromise("Countries", false);
        };

        factory.getCountriesFromServer = function() {
            return getResourcePromise("Countries", true);
        };

        // Here we are wrapping the returned promise with the .success and .error functions
        // that are typical of the angular $http library.  This is so downstream code is
        // unaffected by this change.
        function getResourcePromise(resource, refreshCache) {

            var promise = $q.when(getResource(resource, refreshCache));

            promise.success = function(fn) {
                promise.then(function(response) {
                    fn(response);
                });
                return promise;
            };

            promise.error = function(fn) {
                promise.then(null, function(response) {
                    fn(response);
                });
                return promise;
            };

            return promise;

        }

        function getResource(resource, refreshCache) {

            var deferred = $q.defer();

            resource = resourceMap[resource];

            if (refreshCache || !resource.cache) {

                $http.get(resource.location)
                    .success(function(result) {
                        resource.cache = result;
                        deferred.resolve(result);
                    })
                    .error(function(error) {
                        deferred.reject(error);
                    });

            } else {

                deferred.resolve(resource.cache);

            }

            return deferred.promise;

        }

        return factory;
    };

    cacheService.$inject = [ '$http', '$q' ];

    angular.module('appRouter')
        .factory('cacheService', cacheService );

}());