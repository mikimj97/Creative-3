angular.module('Search', ['ui.router'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/home.html',
                    controller: 'MainCtrl'
                });
            // .state('posts', {
            //   url: '/posts/{id}',
            //   templateUrl: '/posts.html',
            //   controller: 'PostsCtrl'
            // });

            $urlRouterProvider.otherwise('home');
        }
    ])
    .factory('postFactory', [function() {
        var o = {
            results: []
        };
        return o;
    }])
    .controller('MainCtrl', [
        '$scope',
        '$http',
        'postFactory',
        function($scope, $http, postFactory) {

            $scope.ingredients = [];
            $scope.favorites = [];
            $scope.p2 = true;
            $scope.div1 = true;
            $scope.results = postFactory.results; //Do we need this?

            $scope.addToList = function() {
                if ($scope.formContent === '') { return; }
                if ($scope.div1) $scope.div1 = false;
                $scope.ingredients.push($scope.formContent);
                
                //console.log($scope.formContent);
                console.log($scope.ingredients);
                $scope.formContent = '';
            };

            $scope.searchFood = function() {
                var searches = $scope.ingredients.join();
                //console.log(searches);
                var link = 'https://www.food2fork.com/api/search?key=22ba8c696ee83f4a051ad6b1c350dcff&q=' + searches;
                //console.log(link);
                $http.get(link).
                then(function(response) {
                    //console.log(response.data);

                    for (var i = 0; i < response.data.count; i++) {
                        //console.log(response.data[i]);
                        //console.log('Title: ' + response.data.recipes[i].title);
                        $scope.results.push({
                            title: response.data.recipes[i].title,
                            url: response.data.recipes[i].source_url,
                            f2f: response.data.recipes[i].f2f_url,
                            rank: response.data.recipes[i].social_rank
                        });
                    }
                    
                    
                    
                    $scope.ingredients = [];
                    $scope.p1 = true;
                    $scope.div1 = true;
                    $scope.formContent = '';
                });
            };
            
            $scope.addToFavorites = function(recipe) {
                if ($scope.p2) { $scope.p2 = false; }
                $scope.favorites.push(recipe);
            };
            
            $scope.removeIngredient = function(recipe) {
                console.log(recipe);
                console.log($scope.ingredients.indexOf(recipe));
                $scope.ingredients.splice(0, $scope.ingredients.indexOf(recipe));
            };
            
            $scope.removeFavorite = function(recipe) {
                console.log(recipe);
                console.log($scope.favorites.indexOf(recipe));
                $scope.favorites.splice(0, $scope.favorites.indexOf(recipe));
            }
        }
    ])
