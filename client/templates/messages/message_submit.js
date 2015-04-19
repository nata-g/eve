Template.messageSubmit.created = function() {
  Session.set('messageSubmitErrors', {});
}

Template.messageSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('messageSubmitErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('messageSubmitErrors')[field] ? 'has-error': '';
  }
});

Template.messageSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    // look up user that it's being sent to
    var $body = $(e.target).find('[name=body]');
    var message = {
      to: this.profile.phone,
      from: '+15128656383',
      body: $body.val()
    };

    var errors = {};
    if (! message.body) {
      errors.body = "Please write a message";
      return Session.set('messageSubmitErrors', errors);
    }

    Meteor.call('sendSMS', message, function(err, res) {
      if(!err) {
        $body.val('');
        throwFlash.success('Message sent');
        console.log(message);
        Meteor.call('messageInsert', message, function(err, res) {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  }
});