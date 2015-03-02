// Users = new Mongo.Collection('users');

validateNewUser = function (user) {
  var errors = {};

  if(!user.name)
    errors.name = "Please fill in a name";

  if(!user.phone)
    errors.phone = "Please fill in a phone";

  if (user.email === "") {
    errors.email = "Please fill in an email";
  } else {
    var isValidEmail = function (user) {
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(user.email);
    }

    // if (isValidEmail(user.email) === false)
    //  console.log(isValidEmail(user.email));
    //  console.log(user.email);
    //  errors.email = "Please double check your email";
  }

  if(!user.password)
    errors.password = "Please fill in a password";

  return errors
}