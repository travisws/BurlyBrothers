//This resends a verification email and checks to make sure the user doesn't spam

Template.resendVerification.events({
  'click .resend-verification-link' (event, template) {
    //Checks to make sure that the user doesn't spam. At the moment untested
    var clicks = 0;
    if (clicks <= 2) {
      Meteor.call('sendVerificationLink', (error, response) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          let email = Meteor.user().emails[0].address;
          Bert.alert(`Verification sent to ${ email }!`, 'success');
        }
      });
      clicks += 1;
    }
  }
});

Template.sendLink.events({
  //resend verification link function
  'click .send-reset-password-link' (event, template) {
    Meteor.call('sendResetPasswordLink', (error, response) => {
      if (error) {
        Bert.alert({
          title: 'Error',
          message: error.reason,
          type: 'danger'
        });
      } else {
        let email = Meteor.user().emails[0].address;
        Bert.alert({
          title: 'Reset Password Link sended',
          message: 'Please check your mails.',
          type: 'info'
        });
      }
    });
  }
});