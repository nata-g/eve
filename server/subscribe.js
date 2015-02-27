var Stripe = StripeAPI('sk_test_4SRU3kmVuOF2xrvQAWiYTNMv');

Meteor.methods({
  subscribe: function(token){
    // get a sync version of our API async func
    var stripeCustomersCreateSync = Meteor.wrapAsync(Stripe.customers.create, Stripe.customers);
    // call the sync version of our API func with the parameters from the method call
    try {
      var customer = stripeCustomersCreateSync({
        source: token.id, // obtained with Stripe Checkout
        plan: "eve",
        email: token.email
      });
      Meteor.users.update(Meteor.userId(), {$set: {'profile.isSubscribed': true, stripe_id: customer.id}});
    }
    catch (err) {
      console.log("error", err);
    }
  }
});