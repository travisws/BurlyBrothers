import {
  Meteor
} from 'meteor/meteor';

<<<<<<< HEAD
if (Meteor.isServer) {
  Meteor.startup(() => {
    process.env.MAIL_URL = "smtps://magictasman@gmail.com:druqodrcoejwkjzb@smtp.gmail.com:465"
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
=======
Meteor.startup(() => {
  smtp = {
    username: 'magictasman@gmail.com', // eg: server@gentlenode.com
    password: 'yyyyyy', // eg: 3eeP1gtizk5eziohfervU
    server: 'smtp.gmail.com', // eg: mail.gandi.net
    port: 465
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  Accounts.emailTemplates.from = "Verfication Link"


  /*process.env.MAIL_URL = "smtp://magictasman@%40gmail.com:Bicycleghost12@smtp.gmail.com:465/";
  Accounts.emailTemplates.from = "Verfication Link"*/
});

Meteor.methods({
  sendVerificationLink() {
    let userId = Meteor.userId();
    if (userId) {
      return Accounts.sendVerificationEmail(userId);
    }
  }
});

Accounts.emailTemplates.siteName = "Hello";
Accounts.emailTemplates.from = "Hello <magictasman@gmail.com>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "Verify Your Email Address";
  },
  text(user, url) {
    let emailAddress = user.emails[0].address,
      urlWithoutHash = url.replace('#/', ''),
      supportEmail = "magictasman@gmail.com",
      emailBody = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
};
>>>>>>> fdbcc274f271429f36c77cf140323b93e0312f73
