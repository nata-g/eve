stripeUpdateSubscription = function(request) {
  var user = Meteor.users.findOne({"customerId": request.customer}, {fields: {"_id": 1}});

  if (user) {
    var update = {
      user: user._id,
      subscription: {
        status: request.cancel_at_period_end ? "canceled" : request.status,
        ends: request.current_period_end
      }
    }
  }

  Meteor.call('updateUserSubscription', update, function (err, response) {
    if (err) {
      console.log(err);
    }
  });
}

stripeCreateInvoice = function(request) {
  var user = Meteor.users.findOne({"customerId": request.customer}, {fields: {"_id": 1, "emails.address": 1}});

  if (user) {
    var invoiceItem = request.lines.data[0];
    var totalAmount = request.total;

    if (totalAmount > 0) {
      // Setup an invoice object.
      var invoice = {
        owner: user._id,
        email: user.emails[0].address,
        date: request.date,
        ends: invoiceItem.period.end,
        amount: totalAmount,
        transactionId: Random.hexString(10)
      }

      Invoices.insert(invoice, function(err, response){
        if (err){
          console.log(err);
        }
      });
    }
  }
  // update subscription.ends
  Meteor.users.update(user, {$set: {
    'subscription.ends': invoice.ends
    }
  });
  // send email to user?
}