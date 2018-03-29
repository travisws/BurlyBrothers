import {
  Meteor
} from 'meteor/meteor';

Meteor.startup(() => {
  smtp = {
    username: 'magictasman@gmail.com', // eg: server@gentlenode.com
    password: 'Bicycleghost12', // eg: 3eeP1gtizk5eziohfervU
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