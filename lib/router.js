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
    return Meteor.subscribe('users');
  },
  onBeforeAction: function() {
    if (Meteor.user()) {
      if (Meteor.user().role == 'admin') {
        this.next();
      } else {
        Router.go('dashboard');
      }
    } else {
      this.render('accessDenied');
    }
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

Router.route('/reset-password/:resetToken', {
  name: 'resetPassword',
  onBeforeAction: function() {
    Session.set('resetToken', this.params.resetToken);
    console.log(this.params.resetToken);
    this.next();
  }
});

Router.route('/webhooks/stripe', function() {
  var request = this.request.body;

  switch(request.type) {
    case "customer.subscription.updated":
      stripeUpdateSubscription(request.data.object);
      break;
    case "invoice.payment_succeeded":
      stripeCreateInvoice(request.data.object);
      break;
  }

  this.reponse.statusCode = 200;
  //setting where server gives this route full access to NodeJS request and response objects
}, {where: 'server'});

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




