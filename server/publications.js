Meteor.publish('users', function() {
  return Meteor.users.find();
});

Meteor.publish('messages', function() {
  return Messages.find();
});

Meteor.publish('userData', function() {
  var currentUser = this.userId;
  if (currentUser) {
    return Meteor.users.find({_id: currentUser}, {
      fields: {
        "profile": 1,
        "emails.address[0]": 1,
        "subscription": 1
      }
    });
  } else {
    return this.ready();
  }
});

/* Meteor.publish('subscribers', function() {
  return Meteor.users.find({ "subscription.status": 'active' });
}); */