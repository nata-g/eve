Meteor.publish('users', function() {
  return Meteor.users.find({}, {fields: {'subscription': 1, 'role': 1}});
});

/* Meteor.publish('subscribers', function() {
  return Meteor.users.find({ "subscription.status": 'active' });
}); */