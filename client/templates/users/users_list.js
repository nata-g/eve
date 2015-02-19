Template.usersList.helpers({
  users: function() {
    return Users.find();
  }
});