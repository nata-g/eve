Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('users');
  }
});

Router.route('/', {name: 'home'});
Router.route('/users', {name: 'usersList'});
Router.route('/users/:_id', {
  name: 'userPage',
  data: function() {
    // this refers to route
    return Users.findOne(this.params._id);
  }
});

// show the not found template if data for userPage returns a "falsy"
Router.onBeforeAction('dataNotFound', {only: 'userPage'});