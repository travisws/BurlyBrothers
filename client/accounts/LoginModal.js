if (Meteor.isClient) {
  //Need toorganize

  //This is the register form to create users. need to add a validator. fuck this thing

  Template.register.events({
    'submit form' (event, template) {
      event.preventDefault();

      //Gets the email and password form the template in client/accunts/LoginModal.html name register
      let user = {
        email: template.find('[name="email"]').value,
        password: template.find('[name="password"]').value
      };
      console.log("Start");
      Accounts.createUser(user, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          console.log("sent verification");
          Meteor.call('sendVerificationLink', (error, response) => {
            if (error) {
              Bert.alert(error.reason, 'danger');
            } else {
              Bert.alert('Welcome!', 'success');
            }
          });
          console.log("sent verification end");
        }
      });
    }
  });
}

//Gets the email and password to login form the template in client/accunts/LoginModal.html name login
Template.login.events({
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

//Logouts the user, the template in client/accunts/LoginModal.html name logout
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

//This resends a verification email and checks to make sure the user doesn't spam
Template.index.events({
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

  Template.changePassword.events({
    'submit form': function() {
      var oldPassword = $('[name=oldPassword]').val();
      var newPassword = $('[name=newPassword]').val();
      console.log("start");
      Bert.alert('start')
      Accounts.changePassword(oldPassword, newPassword, function(err) {
        if (err) {
          if (err.message === 'User not found [403]') {
            console.log('This email does not exist.');
            alert('This email does not exist.');
          } else {
            console.log('We are sorry but something went wrong.');
            alert('We are sorry but something went wrong.');
          }
        } else {
          console.log('Email Sent. Check your mailbox.');
          alert('Email Sent. Check your mailbox.');
          Bert.alert("Instructions sent! We've sent an email with instructions on how to reset your password.If you don't receive an email within a few minutes, check your spam and junk folders.", 'success', 'growl-top-right');
          return false;
        }
      });
      console.log("end");
    }
  });
}