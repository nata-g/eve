Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe('users');
  }
});

Router.route('/', {name: 'home'});
Router.route('/users', {name: 'usersList'});