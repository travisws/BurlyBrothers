if (Meteor.isServer) {
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