Template.register.created = function() {
  Session.set('registerErrors', {});
}

Template.register.helpers({
  errorMessage: function(field) {
    return Session.get('registerErrors')[field];
  },
  errorClass: function(field) {
    // !! converts to boolean and ensures boolean type
    return !!Session.get('registerErrors')[field] ? 'has-error' : '';
  }
});

Template.register.events({
  // e = event, t = template
  'submit #register-form': function(e, t) {
    e.preventDefault();
    var user = {
      name: t.find('#account-name').value,
      phone: t.find('#account-phone').value,
      email: t.find('#account-email').value,
      password: t.find('#account-password').value
    };

    var email = trimInput(user.email);

    var errors = validateNewUser(user);
    if (errors.name|| errors.phone || errors.email)
      return Session.set('registerErrors', errors);

    Accounts.createUser({
      email: email,
      password: user.password,
      profile: {
        name: user.name,
        phone: user.phone
      },
    }, function(err){
      if (err) {
        // Inform the user that account creation failed
        return throwFlash.error(err.reason);
      } else {
        // Success. Account has been created and the user
        // has logged in successfully.
        Router.go('dashboard');
        // Send user email to complete enrollment with link to password
        // Accounts.sendEnrollmentEmail(userId);
      }
    });


    return false;
  }
});