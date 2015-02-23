Template.subscribersList.helpers({
  subscribers: function() {
    return Meteor.users.find();
  },
  subscriberCount: function() {
   return Meteor.users.find().count();
  }
});