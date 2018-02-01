//Wrap entire app in a closure
(function(){

  var url = "http://136.145.59.111:9000/";
  //var url = "http://localhost:9000/";

  var Info = "";
  var example1model=[];
  var example2model={};
  var example3model={};
  var showPost=false;


  var app = angular.module('resourceLocator', ["ui.bootstrap.modal","ngMaterial","ngAnimate"]);

  app.controller('PanelController', function($scope,$http,$mdDialog){
    $scope.settings = { selectionLimit: 1 };

    $scope.resourceGets = {0:"All Resources",1:"All Resources In Stock",2:"Resource in stock by name",3:"Resource by Resource ID",4:"Resource by name (out of stock included)",5:"Resources by Category ID",6:"Resources by Category Name",7:"Resources by name and supplier",8:"Resources by Resource ID and Region ID",9:"Post a resource"};
    $scope.selectedResourceGet;
    $scope.selectedIndex;

    $scope.requestOptions = {0:"All Requests", 1:"Requests by Resource ID", 2:"Requests By Resource Name", 3:"Post a Request"};
    $scope.selectedRequestOption;

    $scope.announcementOptions = {0:"All Announcements", 1:"Announcement by Supplier ID", 2:"Announcement By Supplier Name", 3:"Announcement By Resource Name",4:"Post an Announcement"};
    $scope.selectedAnnouncementOption;

    $scope.transactionOptions = {0:"All Transactions", 1:"Transactions by purchase ID", 2:"Purchase By resource ID", 3:"Purchase By Supplier ID",4:"Purchase by customer ID",5:"All reservations",6:"Make a reservation",7:"Purchase a resource"};
    $scope.selectedTransactionOption;

    $scope.userOptions = {0:"Register User"}
    $scope.selectedUserOption;

    $scope.change = function(){
      if ($scope.selectedAnnouncementOption=="Post an Announcement"||$scope.selectedResourceGet=="Post a resource" || $scope.selectedRequestOption == "Post a Request"||$scope.selectedUserOption=="Register User"||$scope.selectedTransactionOption=="Purchase a resource") {
        $scope.showPost=true;
      }
    };

    this.getUser =function(){
      example3model.username = $scope.username;
      example3model.password = $scope.password;
      example3model.sid = $scope.sid;
      example3model.cid = $scope.cid;
      $http.post("http://127.0.0.1:5000/ResourceLocator/user/register", example3model)
     .then(function(response){
       alert("Successfully inserted user!");
     });

    };

    this.getAllTransactions = function(){
      for (var i = 0; i < 10; i++) {
        if ($scope.transactionOptions[i]==$scope.selectedTransactionOption) {
          $scope.selectedIndex = i;
        }
      };
      switch ($scope.selectedIndex) {
        case 0:
          $http.get("http://127.0.0.1:5000/ResourceLocator/purchase")
          .then(function(response){
            $scope.display=response.data;
            // console.log(response);
          });
          break;
        case 1:
          $http.get("http://127.0.0.1:5000/ResourceLocator/purchase/"+$scope.blahTransaction)
          .then(function(response){
            $scope.display=response.data;
          });
          break;
        case 2:
          $http.get("http://127.0.0.1:5000/ResourceLocator/purchase/resource/"+$scope.blahTransaction)
          .then(function(response){
            $scope.display=response.data;
            console.log(response);
          });
          break;
          case 3:
            $http.get("http://127.0.0.1:5000/ResourceLocator/SearchAnnounce/Resource/"+$scope.blahTransaction)
            .then(function(response){
              $scope.display=response.data;
              console.log(response);
            });
            break;
        case 7:
        example2model.sid = $scope.sid;
        example2model.rid = $scope.rid;
        example2model.pqty = $scope.pqty;
        example2model.pprice = $scope.pprice;
        example2model.cid = $scope.cid;
             $http.post("http://127.0.0.1:5000/ResourceLocator/purchase", example2model)
            .then(function(response){
              alert("Purchase made!");
            });

            break;
        default:
        break;
      }

    };

    this.RequestMethodToggle = function(){
      for (var i = 0; i < 4; i++) {
        if ($scope.requestOptions[i]==$scope.selectedRequestOption) {
          $scope.selectedIndex = i;
        }
      };
      switch ($scope.selectedIndex){
        case 0:
          $http.get("http://127.0.0.1:5000/ResourceLocator/BrowseRequests/")
          .then(function(response){
            $scope.display = response.data;
            console.log(response);
          });
          break;
        case 1:

        var resourceId = $scope.currentSelec;
        $http.get("http://127.0.0.1:5000/ResourceLocator/requests/" + resourceId)
        .then(function(response){
          $scope.display = response.data;
          console.log(response);
        });
        break;
        case 2:
        var resourceName = $scope.currentSelec;
        $http.get("http://127.0.0.1:5000/ResourceLocator/requests/" + resourceName)
        .then(function(response){
          $scope.display = response.data;
          console.log(response);
        });
        break;
        case 3:
        var requestjson={};
        requestjson.cid = $scope.cid;
        requestjson.rid = $scope.rid;
        requestjson.tid = $scope.tid;
        requestjson.rrqty = $scope.rrqty;
        $http.post("http://127.0.0.1:5000/ResourceLocator/BrowseRequests", requestjson)
        .then(function(response){
        alert("Successfully inserted request!");
        });
        break;
        default:
      }

    };
    this.getAllAnnouncements = function(){
      for (var i = 0; i < 10; i++) {
        if ($scope.announcementOptions[i]==$scope.selectedAnnouncementOption) {
          $scope.selectedIndex = i;
        }
      };
      switch ($scope.selectedIndex) {
        case 0:
          $http.get("http://127.0.0.1:5000/ResourceLocator/Announcements")
          .then(function(response){
            $scope.display=response.data;
            // console.log(response);
          });
          break;
        case 1:
          $http.get("http://127.0.0.1:5000/ResourceLocator/Announcements/"+$scope.resourceInput)
          .then(function(response){
            $scope.display=response.data;
            console.log(response);
          });
          break;
        case 2:
          $http.get("http://127.0.0.1:5000/ResourceLocator/Announcements/"+$scope.resourceInput)
          .then(function(response){
            $scope.display=response.data;
            console.log(response);
          });
          break;
          case 3:
            $http.get("http://127.0.0.1:5000/ResourceLocator/SearchAnnounce/Resource/"+$scope.resourceInput)
            .then(function(response){
              $scope.display=response.data;
              console.log(response);
            });
            break;
        case 4:
        example2model.sid = $scope.sid;
        example2model.rid = $scope.rid;
        example2model.aqty = $scope.aqty;
        example2model.aprice = $scope.aprice;
        example2model.tid = $scope.tid;
             $http.post("http://127.0.0.1:5000/ResourceLocator/Announcements", example2model)
            .then(function(response){
              alert(response);
            });

            break;
        default:
        break;
      }

    };

    this.getAllResources = function(){
        $scope.responsejson1 = [];
      for (var i = 0; i < 10; i++) {
        if ($scope.resourceGets[i]==$scope.selectedResourceGet) {
          $scope.selectedIndex = i;
        }
      };
      switch ($scope.selectedIndex) {
        case 0:

          $http.get("http://127.0.0.1:5000/ResourceLocator/resource")
          .then(function(response){
            $scope.display=response.data;
            $scope.responsejson1 = response.data;
             console.log($scope.responsejson1 );
          });
          break;
        case 1:
          $http.get("http://127.0.0.1:5000/ResourceLocator/resource/instock")
          .then(function(response){
            $scope.display=response.data;
            console.log(response);
          });
          break;
        case 2:
          $http.get("http://127.0.0.1:5000/ResourceLocator/resource/instock/"+$scope.resourceInput)
          .then(function(response){
            $scope.display=response.data;
            console.log(response);
          });
          break;
        case 3:
          $http.get("http://127.0.0.1:5000/ResourceLocator/resource/"+$scope.resourceInput)
          .then(function(response){
            $scope.display=response.data;
            console.log(response);
          });
            break;
        case 4:
          $http.get("http://127.0.0.1:5000/ResourceLocator/resource/"+$scope.resourceInput)
          .then(function(response){
            $scope.display=response.data;
            console.log(response);
          });
          break;
        case 5:
          $http.get("http://127.0.0.1:5000/ResourceLocator/resource/category/"+$scope.resourceInput)
          .then(function(response){
            $scope.display=response.data;
            console.log(response);
          });
          break;
        case 6:
          $http.get("http://127.0.0.1:5000/ResourceLocator/resource/category/"+$scope.resourceInput)
          .then(function(response){
            $scope.display=response.data;
            console.log(response);
          });
          break;
        case 7:
          $http.get("http://127.0.0.1:5000/ResourceLocator/resource/"+$scope.resourceName+"/supplier/"+$scope.supplierID)
          .then(function(response){
            $scope.display=response.data;
            console.log(response);
          });
          break;
        case 8:
          $http.get("http://127.0.0.1:5000/ResourceLocator/resource/"+$scope.resourceID+"/region/"+$scope.townID)
          .then(function(response){
            $scope.display=response.data;
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
        break;
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
