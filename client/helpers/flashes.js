// Local (client-only) collection
Flashes = new Mongo.Collection(null);

/* throwFlash = function(message) {
  Flashes.insert({message: message});
}; */

// more flexible for all types of flashes
throwFlash = {
  error: function(message) {
    sendFlash(message, 'alert-error alert-danger');
  },
  success: function(message) {
    sendFlash(message, 'alert-success');
  },
  warning: function(message) {
    sendFlash(message, 'alert-warning');
  },
  info: function(message) {
    sendFlash(message, 'alert-info');
  }
}

sendFlash = function(message, style) {
  Flashes.insert({
    message: message,
    style: style
  });
}