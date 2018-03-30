if (Meteor.isClient) {
  //Need toorganize

  //This is the register form to create users. need to add a validator. fuck this thing

  Template.createAccount.events({
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
} //end of isClient.