Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound' /*,
  waitOn: function() {
    return Meteor.subscribe('users');
  } */
});

Router.route('/', {name: 'home'});
Router.route('/dashboard', {
  name: 'dashboard',
  waitOn: function() {
    return Meteor.subscribe('users');
  }
});
Router.route('/subscribers', {
  name: 'subscribersList',
  waitOn: function() {
    return Meteor.subscribe('subscribers');
  }
});
// not sure i need this route to exist
Router.route('/users/:_id', {
  name: 'userPage',
  waitOn: function() {
    return Meteor.subscribe('users');
  },
  data: function() {
    // this refers to route
    return Meteor.users.findOne(this.params._id);
  }
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    // what does this line do?
    this.next();
  }
}

// show the not found template if data for userPage returns a "falsy"
Router.onBeforeAction('dataNotFound', {only: 'userPage'});

// require login
Router.onBeforeAction(requireLogin, {only: 'dashboard'});