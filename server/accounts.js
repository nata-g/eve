Meteor.startup(function () {
  if ( Meteor.users.find().count() === 0 ) {
    var admin = Accounts.createUser({
      email: 'achievewitheve@gmail.com',
      password: 'letsmakemoney14',
      profile: {
        name: 'Admin Eve',
        phone: '(512) 710-8383',
      },
    });
    Meteor.users.update({_id: admin}, { $set: {role: 'admin'} });
  }
});

Accounts.urls.resetPassword = function (token) {
  return Meteor.absoluteUrl('reset-password/' + token);
};
