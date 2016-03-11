'use strict';

angular.module('sgb-events-exhibitors', ['megazord'])
    .controller('sgb-events-exhibitors-controller', ['$scope', '_router', '_screen', '_screenParams','appConstants','lodash','_data','$ionicScrollDelegate',
    			function ($scope, _router, _screen, _screenParams, appConstants, _, _data, $ionicScrollDelegate) {
        _screen.initialize($scope, _screenParams);
    	$scope.fullImagePath = appConstants.fullImagePath;
        $scope.exhibitors = _data.categories; 
        $scope.filteredItems = angular.copy($scope.exhibitors);

		function resetToggle(data) {
            _.forEach(data, function(service) {
                service.toggle = false; 
            });
            $ionicScrollDelegate.resize(); 
        }

		function initToggle(data) {
            _.forEach(data, function(service) {
                _.assign(service, { toggle : false}); 
            });
        }

        initToggle($scope.filteredItems); 

		$scope.filterItems = function(searchQuery){
            var search = searchQuery.toLowerCase(); 
            for (var i = 0; i < $scope.filteredItems.length; i++) {
                $scope.filteredItemsInside = _.filter($scope.exhibitors[i].exhibitors, function(exhibitor){
                    return (exhibitor.companyName && exhibitor.companyName.toLowerCase().indexOf(search) != -1 ||
                    ($scope.exhibitors[i].name && $scope.exhibitors[i].name.toLowerCase().indexOf(search) != -1 ) ||
                    ( search == "" && typeof exhibitor.companyName  === "undefined"));
                });
                $scope.filteredItems[i].exhibitors = $scope.filteredItemsInside;
            }
            if (search == ""){
                $timeout(function(){
                    $scope.unToggleAllGroups();
                }, 0);
            }
        };

      	$scope.cancelSearch = function(){
            $scope.filteredItems = angular.copy($scope.exhibitors);
        };

        $scope.itemClickHandler = function(item){
            _router.fireEvent({
                name: 'goToExhibitorDetail', 
                params: {
                    data: item
                }
            })
        };


    }]);