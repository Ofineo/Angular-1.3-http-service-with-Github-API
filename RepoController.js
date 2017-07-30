(function() {

  var app = angular.module("githubViewer");

  var RepoController = function($scope, github, $routeParams) {

    var onRepoComplete = function(data) {
      $scope.repo = data;
      github.getContributors($scope.repo.contributors_url).then(onContributors, onError);
      
    };
    
    var onContributors = function(data){
      $scope.contributors = data;
      console.log($scope.contributors.login);
    };

    var onError = function(reason) {
      $scope.error = "could not fetch the data";
    };

    $scope.reponame = $routeParams.reponame;
    $scope.username = $routeParams.username;
    github.getRepoDetails($scope.username, $scope.reponame).then(onRepoComplete, onError);


  };

  app.controller("RepoController", RepoController);

}());