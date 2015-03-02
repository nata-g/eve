Template.resetPassword.events({
  'submit #new-password': function(e, t) {
    e.preventDefault();
    var password = t.find('#new-password-password').value;
    if (password) {
      Session.set('loading', true);
      Accounts.resetPassword(Session.get('resetToken'), password, function(err){
        if (err)
          throwFlash.error(err.reason);
        else {
          Session.set('resetToken', null);
          Router.go('dashboard');
          throwFlash.success('Password changed!');
        }
        Session.set('loading', false);
      });
    }
  return false;
  }
});
