UI.registerHelper('formatTime', function(epoch) {
  // take an epoch and make it human readable
  return moment.unix(epoch).format("dddd, MMMM Do YYYY");
});