//This js file is for routing to different pages according to the usrls.
//All the pages are dynamically loadeding into the MainLayout to save code

//the root of the page. html file main.html under the Template MainLayout
FlowRouter.route('/', {
  name: 'MainLayout',
  action() {
    console.log("Yeah! We are on the post:");
    BlazeLayout.render('MainLayout');
  }
});
//The home page, html file is pages/home.html
FlowRouter.route('/home', {
  name: 'Home',
  action() {
    BlazeLayout.render('MainLayout', {
      main: 'Home'
    });
  }
});
//The shop page, html file pages/shop.html
FlowRouter.route('/shop', {
  name: 'Shop',
  action() {
    BlazeLayout.render('MainLayout', {
      main: 'Shop'
    });
  }
});
//The US page, html file us.html
FlowRouter.route('/us', {
  name: 'US',
  action() {
    BlazeLayout.render('MainLayout', {
      main: 'US'
    });
  }
});
//The Blog page, html file pages/blog.html
FlowRouter.route('/blog', {
  name: 'Blog',
  action() {
    BlazeLayout.render('MainLayout', {
      main: 'Blog'
    });
  }
});
<<<<<<< HEAD
//This route id to verify the email we send with dynamic urls. Oh fun!
FlowRouter.route('/verify-email/:token', {
  name: 'verify-email',
  action(params) {
    BlazeLayout.render('MainLayout', {
      //main: 'verifyEmail'
    });
    Accounts.verifyEmail(params.token, (error) => {
      if (error) {
        Bert.alert({
          title: 'Error',
          message: error.reason,
          type: 'danger'
        });
=======

FlowRouter.route('/verify-email/:token', {
  name: 'verify-email',
  action(params) {
    Accounts.verifyEmail(params.token, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
>>>>>>> fdbcc274f271429f36c77cf140323b93e0312f73
      } else {
        FlowRouter.go('/');
        Bert.alert('Email verified! Thanks!', 'success');
      }
    });
  }
<<<<<<< HEAD
});

FlowRouter.route('/reset-password/:token', {
  name: 'reset-password',
  action(params) {
    BlazeLayout.render('resetPassword', {
      content: 'body'
    });
    Accounts.resetPassword(params.token, (error) => {
      if (error) {
        Bert.alert({
          title: 'Error',
          message: error.reason,
          type: 'danger'
        });
      } else {
        FlowRouter.go('/');
      }
    });
  }
=======
>>>>>>> fdbcc274f271429f36c77cf140323b93e0312f73
});