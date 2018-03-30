//Gets the email and password to login form the template in client/accunts/LoginModal.html name login
Template.loginModal.events({
  'submit form': function(event) {
    event.preventDefault();
    Bert.alert('start');
    var emailVar = $('[name=loginEmail]').val();
    var passwordVar = $('[name=loginPassword]').val();
    Meteor.loginWithPassword(emailVar, passwordVar);
    Bert.alert('Reload page');
    FlowRouter.reload();
  }
});

Template.logout.events({
  'click .logout': function(event) {
    event.preventDefault();
    Meteor.logout(function(err) {
      if (!err) {
        console.log('Logout was a success!')
      } else {
        console.log(err);
      }
    });
  }
});