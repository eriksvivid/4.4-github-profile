var _ = require('underscore');
var handlebars = require('handlebars');
var $ = require('jquery');

var users = 'https://api.github.com/users/eriksvivid';
var repos = 'https://api.github.com/users/eriksvivid/repos';

function repo(){
  $.ajax(repos).done(function(data){
    // console.log(data);
    $.each(data, function(index, repo){
      var repoData = {
        repoUrl: repo.html_url,
        repoName: repo.name,
        updated: repo.updated_at
      };

      var source = $('#repo-tab').html();
      var template = handlebars.compile(source);
      var html = template(repoData);
      $('.repositories').append(html);
    });
  });
};
repo();

function user(){
  $.ajax(users).done(function(data){
    console.log(data);
    var userData = {
      avatar: data.avatar_url,
      name: data.name,
      login: data.login,
      joined: data.created_at,
      followers: data.followers,
      followersUrl: data.followers_url,
      following: data.following,
      followingUrl: data.following_url,
      organizations: data.organizations_url
    };

    var source = $('#user-profile').html();
    var template = handlebars.compile(source);
    var html = template(userData);
    $('.user').append(html);
  });
};

user();
