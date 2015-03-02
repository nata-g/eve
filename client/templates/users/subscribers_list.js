Template.subscribersList.helpers({
  subscribers: function() {
    return Meteor.users.find({ "subscription.status": 'active' });
  },
  subscriberCount: function() {
   return Meteor.users.find({ "subscription.status": 'active' }).count();
  }
});