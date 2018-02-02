//Wrap entire app in a closure
(function(){

  //var url = "http://35.164.17.105/";
  var url = "http://127.0.0.1:5000/";

  var Info = "";
  var example1model={};
  var example2model={};
  var example3model={};
  var example4model={};
  var example5model={};
  var showPost=false;


  var app = angular.module('resourceLocator', []);

  app.controller('PanelController', function($scope,$http,$q){
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

    $scope.userOptions = {0:"Register Customer", 1:"Register Supplier"}
    $scope.selectedUserOption;

    $scope.change = function(){
      if ($scope.selectedAnnouncementOption=="Post an Announcement"||$scope.selectedResourceGet=="Post a resource" || $scope.selectedRequestOption == "Post a Request"||$scope.selectedUserOption=="Register Customer"||$scope.selectedUserOption=="Register Supplier"||$scope.selectedTransactionOption=="Purchase a resource") {
        $scope.showPost=true;
      }
    };

    this.registerUser=function(){

      if($scope.selectedUserOption=="Register Customer"){
        example4model.username = $scope.username;
        example4model.password = $scope.password;
        example4model.name = $scope.name;
        example4model.lastname = $scope.lastname;
        example4model.gpsy = $scope.gpsy;
        example4model.gpsx = $scope.gpsx;
        example4model.tid = $scope.tid;
        example4model.address = $scope.address;
         console.log(example4model);
        $http.post(url+"ResourceLocator/customer/user/register", example4model)
       .then(function(response){
          console.log(response);
         alert("Successfully inserted user!");
       });
      }
      else{
        example4model.username = $scope.username;
        example4model.password = $scope.password;
        example4model.name = $scope.name;
        example4model.lastname = $scope.lastname;
        example4model.gpsy = $scope.gpsy;
        example4model.gpsx = $scope.gpsx;
        example4model.tid = $scope.tid;
        example4model.address = $scope.address;
        example4model.company = "Null"
         console.log(example4model);
         //esta ruta todavia no existe
        $http.post(url+"ResourceLocator/supplier/user/register", example4model)
       .then(function(response){
          console.log(response);
         alert("Successfully inserted user!");
       });
      }

   };

     this.registerCard=function(){
       example5model.cid = $scope.cid;
       example5model.number = $scope.number;
       example5model.cvv = $scope.cvv;
       example5model.name = $scope.name;
       example5model.expiration = $scope.expiration;
       $http.post(url+"ResourceLocator/ccard/",example5model)
       .then(function(response){
         console.log(response);
         alert("Card inserted Successfully");

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
         showPost=false;
          $http.get(url+"ResourceLocator/purchase")
          .then(function(response){
            $scope.display=response.data;
             console.log(response);
          });
          break;
        case 1:
          $http.get(url+"ResourceLocator/purchase/"+$scope.blahTransaction)
          .then(function(response){
            $scope.display=response.data;
          });
          break;
        case 2:
          $http.get(url+"ResourceLocator/purchase/resource/"+$scope.blahTransaction)
          .then(function(response){
            $scope.display=response.data;
            console.log(response);
          });
          break;
          case 3:
            $http.get(url+"ResourceLocator/SearchAnnounce/Resource/"+$scope.blahTransaction)
            .then(function(response){
              $scope.display=response.data;
              console.log(response);
            });
            break;
                        case 4:
               $http.get(url+"ResourceLocator/purchase/customer/"+$scope.blahTransaction)
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
        alert(example2model);
             $http.post(url+"ResourceLocator/purchase", example2model)
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
        showPost=false;
          $http.get(url+"ResourceLocator/BrowseRequests/")
          .then(function(response){
            $scope.display = response.data;
            console.log(response);
          });
          break;
        case 1:

        var resourceId = $scope.currentSelec;
        $http.get(url+"ResourceLocator/requests/" + resourceId)
        .then(function(response){
          $scope.display = response.data;
          console.log(response);
        });
        break;
        case 2:
        var resourceName = $scope.currentSelec;
        $http.get(url+"ResourceLocator/requests/" + resourceName)
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
        $http.post(url+"ResourceLocator/BrowseRequests/", requestjson)
        .then(function(response){
        alert("Successfully inserted request!");
        });
        break;
        default:
      }

    };


    this.asyncoooo = function(){
      var deferred = $q.defer();

      return deferred.promise;
    };



    this.getAllAnnouncements = function(){
      for (var i = 0; i < 10; i++) {
        if ($scope.announcementOptions[i]==$scope.selectedAnnouncementOption) {
          $scope.selectedIndex = i;
        }
      };
      switch ($scope.selectedIndex) {
        case 0:
          $http.get(url+"ResourceLocator/Announcements")
          .then(function(response){
            $scope.display=response.data;
             console.log(response);
          });
          break;
        case 1:
          $http.get(url+"ResourceLocator/Announcements/"+$scope.resourceInput)
          .then(function(response){
            $scope.display=response.data;
            console.log(response);
          });
          break;
        case 2:
          $http.get(url+"ResourceLocator/Announcements/"+$scope.resourceInput)
          .then(function(response){
            $scope.display=response.data;
            console.log(response);
          });
          break;
          case 3:
            $http.get(url+"ResourceLocator/SearchAnnounce/Resource/"+$scope.resourceInput)
            .then(function(response){
              $scope.display=response.data;
              console.log(response);
            });
            break;
        case 4:

        example2model.rid = $scope.rid;
        example2model.aqty = $scope.aqty;
        example2model.aprice = $scope.rprice;
        example2model.tid = $scope.tid;
        example2model.sid = $scope.sid;


        $http.post(url+"ResourceLocator/Announcements/", example2model)
         .then(function(response){
           alert(response);
         });
        console.log(example2model);
        // promise.then(  );



          break;
        default:
        break;
      }

    };



    this.getAllResources = function(){
      for (var i = 0; i < 10; i++) {
        if ($scope.resourceGets[i]==$scope.selectedResourceGet) {
          $scope.selectedIndex = i;
        }
      };
      switch ($scope.selectedIndex) {
        case 0:

          $http.get(url+"ResourceLocator/resource")
          .then(function(response){
            $scope.display=response.data;
             console.log(response);
          });
          break;
        case 1:
          $http.get(url+"ResourceLocator/resource/instock")
          .then(function(response){
            $scope.display=response.data;
            console.log(response);
          });
          break;
        case 2:
          $http.get(url+"ResourceLocator/resource/instock/"+$scope.resourceInput)
          .then(function(response){
            $scope.display=response.data;
            console.log(response);
          });
          break;
        case 3:
          $http.get(url+"ResourceLocator/resource/"+$scope.resourceInput)
          .then(function(response){
            $scope.display=response.data;
            console.log(response);
          });
            break;
        case 4:
          $http.get(url+"ResourceLocator/resource/"+$scope.resourceInput)
          .then(function(response){
            $scope.display=response.data;
            console.log(response);
          });
          break;
        case 5:
          $http.get(url+"ResourceLocator/resource/category/"+$scope.resourceInput)
          .then(function(response){
            $scope.display=response.data;
            console.log(response);
          });
          break;
        case 6:
          $http.get(url+"ResourceLocator/resource/category/"+$scope.resourceInput)
          .then(function(response){
            $scope.display=response.data;
            console.log(response);
          });
          break;
        case 7:
          $http.get(url+"ResourceLocator/resource/"+$scope.resourceName+"/supplier/"+$scope.supplierID)
          .then(function(response){
            $scope.display=response.data;
            console.log(response);
          });
          break;
        case 8:
          $http.get(url+"ResourceLocator/resource/"+$scope.resourceID+"/region/"+$scope.townID)
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
         console.log(example1model);
            $http.post(url+"ResourceLocator/resource", example1model)
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
