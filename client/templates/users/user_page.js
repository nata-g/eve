Template.userPage.helpers({
  messages: function() {
    return Messages.find({userId: this._id});
  },
  isAllowedUser: function() {
    return Meteor.user().role == 'admin' || currentUser;
  }
})