import {
  Meteor
} from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.startup(() => {
    Accounts.emailTemplates.from = "Verfication Link"

    Accounts.urls.resetPassword = function(token) {
      return Meteor.absoluteUrl('reset-password/' + token);
    }

    Accounts.emailTemplates.verifyEmail = {
      subject() {
        return "Verify Your Email Address";
      },
      text(user, url) {
        let emailAddress = user.emails[0].address,
          urlWithoutHash = url.replace('#/', ''),
          supportEmail = "smtp.gmail.com",
          emailBody = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

        return emailBody;
      }
    };

    Accounts.emailTemplates.resetPassword = {
      from: () => "magictasman@gmail.com",
      subject: () => "Reset Your Account Password",
      text: (user, url) => {
        const newUrl = url.replace("#/reset-password", "setpswd");
        return `Hi,Click the Link below to reset your password:\n${newUrl}`;
      }
    };

    Meteor.methods({
      sendVerificationLink() {
        let userId = Meteor.userId();
        if (userId) {
          return Accounts.sendVerificationEmail(userId);
        }
      }
    });

    Meteor.methods({
      sendResetPasswordLink() {
        let userId = Meteor.userId();
        if (userId) {
          return Accounts.sendResetPasswordEmail(userId);
        }
      }
    });
    //To test if email is working.
    /*  Email.send({
        to: "traviswoodworthsmith@gmail.com",
        from: "magictasman@gmail.com",
        subject: "Example Email",
        text: "The contents of our email in plain text.",
      });*/
    /*
        //resetPassword Template
        Accounts.emailTemplates.siteName = "Me";
        Accounts.emailTemplates.from = "Me <my@mail.com>";
        Accounts.emailTemplates.resetPassword.subject = function(user) {
          return "Reset Your Password";
        };
        // html template
        Accounts.emailTemplates.resetPassword.html = function(user, url) {
          SSR.compileTemplate('htmlEmail', Assets.getText('emailverification.html'));
          let emailAddress = user.emails[0].address,
            userAvatar = user.profile.avatar,
            urlWithoutHash = url.replace('#/', '');
          var emailData = {
            urlWithoutHash: `${urlWithoutHash}`,
            userAvatar: `${userAvatar}`,
          };
          return SSR.render('htmlEmail', emailData);
        };*/

    Accounts.config({
      sendVerificationEmail: true
    })
  });
} //end of IsServer