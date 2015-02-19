var usersData = [
  {
    name: 'Leeah Kohley',
    phone: '(231) 215-7062',
    email: 'lkohley8@gmail.com'
  },
  {
    name: 'John Mauro',
    phone: '(210) 273-6251',
    email: 'jamauro@gmail.com'
  },
  {
    name: 'Bob Marley',
    phone: '(512) 643-5498',
    email: 'bmarley@gmail.com'
  },
];

Template.usersList.helpers({
  users: usersData
});