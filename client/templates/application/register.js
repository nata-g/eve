Template.register.events({
  // e = event, t = template
  'submit #register-form': function(e, t) {
    e.preventDefault();
    var name = t.find('#account-name').value
      , phone = t.find('#account-phone').value
      , email = t.find('#account-email').value
      , password = t.find('#account-password').value;

    // trim helper
    var trimInput = function(val) {
      return val.replace(/^\s*|\s*$/g, "");
    }

    var email = trimInput(email);

    Accounts.createUser({
      email: email,
      password: password,
      profile: {
        name: name,
        phone: phone
      },
    }, function(err){
      if (err) {
        // Inform the user that account creation failed
        alert('Oops, something went wrong');
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