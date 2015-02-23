var Stripe = StripeAPI('sk_test_4SRU3kmVuOF2xrvQAWiYTNMv');

Meteor.methods({
  subscribe: function(token){
    Stripe.customers.create({
      source: token.id, // obtained with Stripe.js
      plan: "eve",
      email: token.email
    }, function(err, customer) {
      // asynchronously called
    });
    // how do i make this so it's only created on success?
    Meteor.users.update(Meteor.userId(), {$set: {'profile.isSubscribed': true}});
  }
});