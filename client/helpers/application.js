// trim helper
trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
}

isValidEmail = function(val) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(val);
}

isValidPassword = function(val) {
  return val.length >= 6 ? true : false;
}