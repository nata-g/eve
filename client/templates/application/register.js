Template.register.created = function() {
  Session.set('registerErrors', {});
}

Template.register.rendered = function() {
  $("#account-phone").intlTelInput({
    //allowExtensions: true,
    //autoFormat: false,
    //autoHideDialCode: false,
    //autoPlaceholder: false,
    //defaultCountry: "auto",
    //ipinfoToken: "yolo",
    //nationalMode: false,
    //numberType: "MOBILE",
    //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
    //preferredCountries: ['cn', 'jp'],
    utilsScript: "libphonenumber/utils.js"
  });
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
    var intlPhone = t.$("#account-phone").intlTelInput("getNumber");
    var user = {
      name: t.find('#account-name').value,
      phone: intlPhone,
      email: t.find('#account-email').value,
      password: t.find('#account-password').value
    };

    var email = trimInput(user.email);

    var errors = validateNewUser(user);
    // if errors is not empty, show the errors
    if (!_.isEmpty(errors)) {
      return Session.set('registerErrors', errors);
    }

    // if (errors.name || errors.phone || errors.email || errors.password)
    console.log(user);
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
        console.log(err);
        return throwFlash.error(err.reason);
      } else {
        // Success. Account has been created and the user
        // has logged in successfully.
        /* analytics.ready(function(){
          var anonId = mixpanel.get_distinct_id();
        }); */
        var userId = Meteor.userId();
        analytics.alias(userId);
        analytics.identify(userId, {
          name: user.name,
          phone: user.phone
        });
        analytics.track('Signed Up');
        Router.go('dashboard');
        // Send user email to complete enrollment with link to password
        // Accounts.sendEnrollmentEmail(userId);
      }
    });


    return false;
  }
});