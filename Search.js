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

            var ingredients = [];

            $scope.results = postFactory.results;

            $scope.addToList = function() {
                console.log("List");
                ingredients.push($scope.formContent);
                console.log($scope.formContent);
                $scope.formContent = '';
            };

            $scope.searchFood = function() {
                console.log("HI!");
                var searches = ingredients.join();
                console.log(searches);
                // if ($scope.formContent === '') { return; }
                var link = 'https://www.food2fork.com/api/search?key=22ba8c696ee83f4a051ad6b1c350dcff&q=' + searches
                console.log(link);
                $http.get(link).
                then(function(response) {
                    console.log(response.data);

                    for (var i = 0; i < response.data.count; i++) {
                        console.log(response.data[i]);
                        console.log('Title: ' + response.data.recipes[i].title);
                        $scope.results.push({
                            title: response.data.recipes[i].title,
                            url: response.data.recipes[i].source_url,
                            f2f: response.data.recipes[i].f2f_url,
                            rank: response.data.recipes[i].social_rank
                            //   upvotes: 0,
                            //   comments: [
                            //   ]
                        });
                    }
                    ingredients = [];

                    $scope.formContent = '';
                    // $scope.greeting = response.data;
                });
            };

            //   $scope.incrementUpvotes = function(post) {
            //     post.upvotes += 1;
            //   };

        }
    ])

// .controller('Hello', function($scope, $http) {
//     $http.get('https://www.food2fork.com/api/search?key=22ba8c696ee83f4a051ad6b1c350dcff&q=chicken,cheese,rice').
//     then(function(response) {
//         console.log(response.data);
//         $scope.greeting = response.data;
//     });
// });
// .controller('PostsCtrl', [
// '$scope',
// '$stateParams',
// 'postFactory',
// function($scope, $stateParams, postFactory){
//   $scope.post = postFactory.posts[$stateParams.id];

//   $scope.addComment = function(){
//     if($scope.body === '') { return; }
//     $scope.post.comments.push({
//       body: $scope.body,
//       upvotes: 0
//     });
//     $scope.body = '';
//   };

//   $scope.incrementUpvotes = function(comment){
//     comment.upvotes += 1;
//   };
// }]);
