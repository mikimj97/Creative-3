/*
I tried adding code to get the rest service working but I'm not sure what's wrong. Lines 34-55

*/



angular.module('Creative', ['ui.router'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/home.html',
                    controller: 'MainCtrl'
                })
                .state('posts', {
                    url: '/posts/{id}',
                    templateUrl: '/posts.html',
                    controller: 'PostsCtrl'
                });

            $urlRouterProvider.otherwise('home');
        }
    ])
    .factory('postFactory', [function() {
        var o = {
            posts: []
        };
        return o;
    }])
    .controller('MainCtrl', [
        '$scope',
        '$http',
        'postFactory',
        function($scope, postFactory) {
            $scope.test = 'Hello world!';
            $scope.posts = postFactory.posts;


            $scope.addRecipe = function() {
                if ($scope.formContent === '') { return; }

                var myurl = "https://www.food2fork.com/about/api/search?key=22ba8c696ee83f4a051ad6b1c350dcff&q=" + formContent;

                $http.get(url).then(function(response) {
                    $scope.recipes.push({
                        title: response.recipe.title,
                        upvotes: 0,
                        comments: [],
                        url: myurl
                    })
                })


                $scope.formContent = '';
            };

            $scope.incrementUpvotes = function(post) {
                post.upvotes += 1;
            };

        }
    ])
    .controller('PostsCtrl', [
        '$scope',
        '$stateParams',
        'postFactory',
        function($scope, $stateParams, postFactory) {
            $scope.post = postFactory.posts[$stateParams.id];

            $scope.addComment = function() {
                if ($scope.body === '') { return; }
                $scope.post.comments.push({
                    body: $scope.body,
                    upvotes: 0
                });
                $scope.body = '';
            };

            $scope.incrementUpvotes = function(comment) {
                comment.upvotes += 1;
            };
        }
    ]);
