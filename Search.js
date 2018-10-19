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
            $scope.results = postFactory.results; //Do we need this? (I think so -Douglas)

            $scope.addToList = function() {
                if ($scope.formContent === '') { return; }
                if ($scope.div1) $scope.div1 = false;
                $scope.ingredients.push($scope.formContent);

                $scope.formContent = '';
            };

            $scope.searchFood = function() {
                console.log('In serach food');
                console.log('array' + $scope.ingredients);
                var searches = $scope.ingredients.join();
                var link = 'https://www.food2fork.com/api/search?key=508ceecf409eca2336666df2f707fac1&q=' + searches;

                $http.get(link).
                then(function(response) {
                    $scope.results = [];
                    
                    for (var i = 0; i < response.data.count; i++) {
                        $scope.results.push({
                            title: response.data.recipes[i].title,
                            url: response.data.recipes[i].source_url,
                            f2f: response.data.recipes[i].f2f_url,
                            rank: response.data.recipes[i].social_rank,
                            image: response.data.recipes[i].image_url
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
                $scope.ingredients.splice($scope.ingredients.indexOf(recipe), 1);
            };

            $scope.removeFavorite = function(recipe) {
                console.log(recipe);
                console.log($scope.favorites.indexOf(recipe));
                $scope.favorites.splice($scope.favorites.indexOf(recipe), 1);
            }
        }
    ])
