import validator from 'validator';

if (Meteor.isClient) {
  Template.register.events({
    'submit form' (event, template) {
      event.preventDefault();

      let user = {
        email: template.find('[name="email"]').value,
        password: template.find('[name="password"]').value
      };

      Accounts.createUser(user, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Meteor.call('sendVerificationLink', (error, response) => {
            if (error) {
              Bert.alert(error.reason, 'danger');
            } else {
              Bert.alert('Welcome!', 'success');
            }
          });
        }
      });
    }
  });
} //End of isClient

Template.login.events({
  'submit form': function(event) {
    event.preventDefault();
    var emailVar = $('[name=loginEmail]').val();
    var passwordVar = $('[name=loginPassword]').val();
    console.log(emailVar, passwordVar);
    Meteor.loginWithPassword(emailVar, passwordVar);
  }
});

Template.dashboard.events({
  'click .logout': function(event) {
    event.preventDefault();
    Meteor.logout();
  }
});


Template.index.events({
  'click .resend-verification-link' (event, template) {
    Meteor.call('sendVerificationLink', (error, response) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        let email = Meteor.user().emails[0].address;
        Bert.alert(`Verification sent to ${ email }!`, 'success');
      }
    });
  }
});

Template.recovery.helpers({
  'resetpassword': function(t) {
    if (Accounts._resetPasswordToken) {
      Session.set('resetToken', Accounts._resetPasswordToken);
      Session.set("resetPass", true);
    }
    return Session.get('resetPassword');
  }
});

Template.recovery.events({
  'submit #recovery-form': function(e, t) {
    e.preventDefault();
    var emailVar = $('[name=recovery-email]').val();
    Accounts.forgotPassword({
      email: emailVar,
      function(error) {
        if (error) {
          alert("Unable to send like")
        } else {
          alert("password reset link sent")
        }
      }
    })
  },
  'submit #new-password': function(e, t) {
    e.preventDefault();
    var newPassword = $('[name=new-password-password]').val();
    Accounts.resetPassword(Session.get("resetToken"), newPass, function(err) {
      if (err) {
        alert("Password not changed");

      } else {
        alert("password changed");
      }
    })
  }
})