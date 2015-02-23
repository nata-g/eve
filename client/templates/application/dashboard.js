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
    return Meteor.user().profile.isSubscribed === true;
  }
});

Template.dashboard.events({
  'click #subscribe': function(e){
    var handler = StripeCheckout.configure({
      key: 'pk_test_BfBZFC5MwEgzwr6xo40rr6xo',
      token: function(token) {
        // Use the token to create the charge with a server-side script.
        // You can access the token ID with `token.id`
        Meteor.call('subscribe', token);
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
    e.preventDefault();
  }
});