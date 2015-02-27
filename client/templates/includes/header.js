Template.header.events({
  "submit #login-form": function(e, t) {
    e.preventDefault();
    Meteor.loginWithPassword(
      t.find("#login-email").value,
      t.find("#login-password").value,
      function(error) {
        if (error) {
          // Display the login error to the user however you want
          return throwError(error.reason);
        }
        else {
          Router.go('dashboard');
        }
      }
    );
  },
  "click .logout": function(e, t) {
    e.preventDefault();
    Meteor.logout(function(error) {
      if (error) {
        // Display the logout error to the user however you want
      }
      else {
        Router.go('home');
      }
    });
  }
});