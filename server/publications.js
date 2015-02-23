Meteor.publish('users', function() {
  return Meteor.users.find();
});

Meteor.publish('subscribers', function() {
  return Meteor.users.find({ "profile.isSubscribed": true });
});