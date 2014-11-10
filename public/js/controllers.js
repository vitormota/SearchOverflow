'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('AppCtrl', function($scope) {

}).
controller('MyCtrl1', function($scope, $http, socket, solrClient) {

    $scope.queryPost = function(query) {
        solrClient.then(function(solrServices) {
            solrServices.queryPost(query).then(function(result) {
                console.log("query: " + query);
                console.log(result);
                $scope.queryResults = result.response.docs;
            });
        });
    };

    $scope.queryAutocompleteResults = [];
    $scope.queryText = '';

    $scope.$watch('queryText',function(query){
        if(query.length) {
            $scope.queryAutocomplete(query);
            $scope.queryPost(query);
        }
    });

   $scope.queryAutocomplete = function(query) {
            solrClient.then(function(solrServices) {
                solrServices.queryAutocomplete(query).then(function(result) {
                    var a = result.facet_counts.facet_fields.Title;
                    $scope.queryAutocompleteResults = [];

                    for (var i = 0; i < a.length; i += 2) {
                        $scope.queryAutocompleteResults.push(a[i]);
                    }
                });
            });
    };
}).
controller('MyCtrl2', function($scope, solrClient) {

    $scope.getPost = function(query) {
            solrClient.then(function(solrServices) {
                solrServices.getPost(query).then(function(result) {
                    console.log(result)
                    $scope.post = result;
                });
            });
    };
});
