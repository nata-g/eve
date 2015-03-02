Template.flashes.helpers({
  flashes: function() {
    return Flashes.find();
  }
});

Template.flash.rendered = function() {
  var flash = this.data;
  Meteor.setTimeout(function() {
    Flashes.remove(flash._id);
  }, 3000);
};