Meteor.startup(function() {
  Stripe.setPublishableKey('pk_test_BfBZFC5MwEgzwr6xo40rr6xo');
});

Template.dashboard.helpers({
  name: function() {
    return Meteor.user().profile.name;
  },
  phone: function() {
    return Meteor.user().profile.phone;
  },
  isSubscribed: function() {
    return Meteor.user().subscription.status === 'active';
  },
  paymentDue: function() {
    return Meteor.user().subscription.ends;
  },
  hasCanceled: function() {
    return Meteor.user().subscription.cancel_at_period_end === true;
  }
});

Template.dashboard.events({
  'click #subscribe': function(e){
    var handler = StripeCheckout.configure({
      key: 'pk_test_BfBZFC5MwEgzwr6xo40rr6xo',
      token: function(token) {
        // Use the token to create the charge with a server-side script.
        // You can access the token ID with `token.id`
        Meteor.call('subscribe', token, function(err, result) {
          if (err) {
            console.log(err.reason);
          } else {
            analytics.track('Subscribed');
          }
        });
      },
      image: "https://stripe.com/img/documentation/checkout/marketplace.png",
      name: "Eve",
      description: "Subscription ($6.99 per month)",
      panelLabel: "Pay $6.99",
      allowRememberMe: false
    });
    handler.open({
      email: Meteor.user().emails[0].address
    });
    analytics.track('Clicked Subscribe');
    e.preventDefault();
  },
  'click .cancel-subscription': function(e) {
    var confirmCancel = confirm("Are you sure you want to cancel your subscription? This means your subscription will no longer be active and your account will be disabled on the cancellation date. If you'd like, you can resubscribe later.")
    if (confirmCancel) {
      var user = Meteor.user();
      Meteor.call('cancelUserSubscription', user, function(err, response) {
        if (err) {
          throwFlash.error(err.message);
        }
      });
    }
  }
});