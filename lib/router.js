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
    return Meteor.subscribe('userData');
  }
});
Router.route('/subscribers', {
  name: 'subscribersList',
  waitOn: function() {
    return [Meteor.subscribe('users'), Meteor.subscribe('messages')];
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
    return [Meteor.subscribe('users'), Meteor.subscribe('messages', this.params._id)];
  },
  data: function() {
    // this refers to route
    return Meteor.users.findOne(this.params._id);
  },
  onBeforeAction: function() {
    if (Meteor.userId() == this.params._id || Meteor.user().role == 'admin') {
      this.next();
    } else {
      this.render('accessDenied');
    }
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

Router.route('incoming', {
  path: '/api/twiml/sms',
  where: 'server',
  action: function() {
    var request = this.request.body;
    console.log(request);
    // test an automated response
    // this.response.writeHead(200, {'Content-Type': 'text/xml'});
    // this.response.end('<Response><Sms>Indeed!</Sms></Response>');
    var message = {
      to: request.To,
      from: request.From,
      body: request.Body,
      status: request.SmsStatus
    };
    Meteor.call('messageInsert', message, function(err, res) {
      if (err) {
        console.log(err);
      }
    });
  }
});


  /* '/api/twiml/sms', 'POST', function() {
  var rawIn = this.request.body;
  console.log(rawIn);
  if (Object.prototype.toString.call(rawIn) == "[object Object]") {
    twilioRawIn.insert(rawIn);
  }
  var to = rawIn.To;
  console.log(to);

  var xml = '<Response><Sms>Indeed!</Sms></Response>';
  return [200, {"Content-Type": "text/xml"}, xml];
}, {where: 'server'}); */

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




