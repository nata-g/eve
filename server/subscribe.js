var Stripe = StripeAPI(Meteor.settings.private.stripe.secretKey);

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
      console.log(customer);
      Meteor.users.update(Meteor.userId(), {$set: {
        'subscription.status': customer.subscription.status,
        'subscription.ends': customer.subscription.current_period_end,
        'subscription.id': customer.subscription.id,
        customerId: customer.id
        }
      });
    }
    catch (err) {
      switch (err.type) {
        case 'StripeCardError':
          // A declined card error
          return throwFlash.error(err.message); // => e.g. "Your card's expiration year is invalid."
          break;
        case 'StripeInvalidRequestError':
          // Invalid parameters were supplied to Stripe's API
          console.log(err.message);
          break;
        case 'StripeAPIError':
          // An error occurred internally with Stripe's API
          console.log(err.message);
          break;
        case 'StripeConnectionError':
          // Some kind of error occurred during the HTTPS communication
          console.log(err.message);
          break;
        case 'StripeAuthenticationError':
          // You probably used an incorrect API key
          console.log(err.message);
          break;
      }
    }
  },
  updateUserSubscription: function(update) {
    Meteor.users.update(update.user, {$set: {
      'subscription.status': update.subscription.status,
      'subscription.ends': update.subscription.current_period_end
      }
    });
  },
  cancelUserSubscription: function(user) {
    var stripeCancelSubscription = Meteor.wrapAsync(Stripe.customers.cancelSubscription, Stripe.customers);
    try {
      var result = stripeCancelSubscription(
        user.customerId,
        user.subscription.id,
        { at_period_end: true }
      );
      console.log(result);
      Meteor.users.update(user, {$set: {
        'subscription.cancel_at_period_end': result.cancel_at_period_end,
        }
      });
    }
    catch (err) {
      console.log(err.message);
    }
  }
});

