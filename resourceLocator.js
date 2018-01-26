//Wrap entire app in a closure
(function(){

  var url = "http://136.145.59.111:9000/";
  //var url = "http://localhost:9000/";

  var Info = "";
  var example1model={};
  var showPost=false;


  var app = angular.module('resourceLocator', ["ui.bootstrap.modal","ngMaterial"]);

  app.controller('PanelController', function($scope,$http,$mdDialog){
    $scope.settings = { selectionLimit: 1 };

    $scope.resourceGets = {0:"All Resources",1:"All Resources In Stock",2:"Resource in stock by name",3:"Resource by Resource ID",4:"Resource by name (out of stock included)",5:"Resources by Category ID",6:"Resources by Category Name",7:"Resources by name and supplier",8:"Resources by Resource ID and Region ID",9:"Post a resource"};
    $scope.selectedResourceGet;
    $scope.selectedIndex;

    $scope.requestOptions = {0:"All Requests", 1:"Requests by Resource ID", 2:"Requests By Resource Name", 3:"Post a Request"}
    $scope.selectedRequestOption;

    $scope.change = function(){
      if ($scope.selectedResourceGet=="Post a resource" || $scope.selectedRequestOption == "Post a Request") {
        $scope.showPost=true;
      }
    };

    this.RequestMethodToggle = function(){
      for (var i = 0; i < 10; i++) {
        if ($scope.requestOptions[i]==$scope.selectedRequestOption) {
          $scope.selectedIndex = i;
        }
      }
      switch ($scope.selectedIndex){
        case 0:
          $http.get("http://127.0.0.1:5000/ResourceLocator/BrowseRequests/")
          .then(function(response){
            console.log(response);
          });
          break;
        case 1:
        var resourceId
        $http.get("http://127.0.0.1:5000/ResourceLocator/requests/{resourceId}")
        .then(function(response){
          console.log(response);
        });
        break;
        case 2:
        var requestjson
             $http.post("http://127.0.0.1:5000/ResourceLocator/BrowseRequests", requestjson)
            .then(function(response){
              alert("Successfully inserted resource!");
            });
            break;
            case 1:
            var resourceName = $scope.requestInput
            $http.get("http://127.0.0.1:5000/ResourceLocator/requests/" + resourceName)
            .then(function(response){
              console.log(response);
            });
            break;

        default:
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
            $scope.display=response.data[0];
            console.log(response);
          });
          break;
        case 1:
          $http.get("http://127.0.0.1:5000/ResourceLocator/resource/instock")
          .then(function(response){
            console.log(response);
          });
          break;
        case 2:
          $http.get("http://127.0.0.1:5000/ResourceLocator/resource/instock/"+$scope.resourceInput)
          .then(function(response){
            console.log(response);
          });
        case 3:
          $http.get("http://127.0.0.1:5000/ResourceLocator/resource/"+$scope.resourceInput)
          .then(function(response){
            console.log(response);
          });
            break;
        case 4:
          $http.get("http://127.0.0.1:5000/ResourceLocator/resource/"+$scope.resourceInput)
          .then(function(response){
            console.log(response);
          });
          break;
        case 5:
          $http.get("http://127.0.0.1:5000/ResourceLocator/resource/category/"+$scope.resourceInput)
          .then(function(response){
            console.log(response);
          });
          break;
        case 6:
          $http.get("http://127.0.0.1:5000/ResourceLocator/resource/category/"+$scope.resourceInput)
          .then(function(response){
            console.log(response);
          });
          break;
        case 7:
          $http.get("http://127.0.0.1:5000/ResourceLocator/resource/"+$scope.resourceName+"/supplier/"+$scope.supplierID)
          .then(function(response){
            console.log(response);
          });
          break;
        case 8:
          $http.get("http://127.0.0.1:5000/ResourceLocator/resource/"+$scope.resourceID+"/region/"+$scope.townID)
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
