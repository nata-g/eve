Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
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