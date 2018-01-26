//Wrap entire app in a closure
(function(){

  var url = "http://136.145.59.111:9000/";
  //var url = "http://localhost:9000/";

  var Info = "";
  var example1model={};
  var showPost=false;


  var app = angular.module('resourceLocator', ["ui.bootstrap.modal","angularjs-dropdown-multiselect","ngMaterial"]);

  app.controller('PanelController', function($scope,$http,$mdDialog){
    $scope.settings = { selectionLimit: 1 };

    $scope.resourceGets = {0:"All Resources",1:"All Resources In Stock",2:"Resource in stock by name",3:"Resource by Resource ID",4:"Resource by name (out of stock included)",5:"Resources by Category ID",6:"Resources by Category Name",7:"Resources by name and supplier",8:"Resources by Resource ID and Region ID",9:"Post a resource"};
    $scope.selectedResourceGet;
    $scope.selectedIndex;

    $scope.change = function(){
      if ($scope.selectedResourceGet=="Post a resource") {
        $scope.showPost=true;
      }

    };

    this.getAllResources = function(){
      for (var i = 0; i < 10; i++) {
        if ($scope.resourceGets[i]==$scope.selectedResourceGet) {
          $scope.selectedIndex = i;
        }
      }
      switch ($scope.selectedIndex) {
        case 0:
          $http.get("http://127.0.0.1:5000/ResourceLocator/resource")
          .then(function(response){
            console.log(response);
          });
          break;
        case 9:
        example1model.rname = $scope.rname;
        example1model.rstock = $scope.rstock;
        example1model.cid = $scope.cid;
        example1model.rprice = $scope.rprice;
             $http.post("http://127.0.0.1:5000/ResourceLocator/resource", example1model)
            .then(function(response){
              alert("Successfully inserted resource!");
            });

            break;
        default:
      }

    };

    this.letsGet = function(){
    };

    this.selectTab = function(setTab){
      this.tab = setTab;
    };
    this.isSelected = function(checkTab){
      return this.tab === checkTab;
    };



    this.letsGet();
  });








})();
