UI.registerHelper('formatTime', function(date) {
  if (typeof(date) == 'number') {
    // take an epoch and make it human readable
    return moment.unix(date).format("dddd, MMMM Do YYYY");
  } else {
    return moment(date).format("MMMM YYYY");
  }
});

UI.registerHelper('formatPhone', function(phone) {
  console.log(phone);
  return intlTelInputUtils.formatNumber(phone);
});