//Working!!!! Need to add a validator
if (Meteor.isServer) {
  Template.resetPassword.helpers({
    resetPassword: function() {
      return Session.get('resetPasswordToken');
    }
  });

  Template.resetPassword.events({
    "submit .reset-password": (event) => {
      // Prevent default browser form submit
      event.preventDefault();
      //let token;
      // Get value from form element
      //  const target = event.target;
      //  const password = event.target.password.value;
      // If the password is valid, we can reset it.
      var newPassword = $('[name=newPassword]').val();

      if (newPassword) {
        Bert.alert('Password', 'Reset');
        //Accounts.resetPassword(token, password, (error) => {
        Accounts.resetPassword(Session.get('resetPasswordToken'), newPassword, (error) => {
          if (error) {
            Bert.alert({
              title: 'Error',
              message: error.reason,
              type: 'danger'
            });
          } else {
            Bert.alert({
              title: 'Success',
              message: 'Account successfully created.',
              type: 'success'
            });
            Session.set('resetPasswordToken', null);
            FlowRouter.go('/');
          }
        });
      } else {
        Bert.alert({
          title: 'Error',
          message: 'The password cannot be empty.',
          type: 'danger'
        });
      }
    }
  });

}