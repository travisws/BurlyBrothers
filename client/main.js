import {
  Template
} from 'meteor/templating';
import {
  ReactiveVar
} from 'meteor/reactive-var';

import './main.html';

if (Meteor.isClient) {
  Template.loginModalButton.events = {
    "click .open-modal": function(e, t) {
      e.preventDefault();
      $("#loginModalButton").modal("show");
      console.log("Hello World");
    }
  };

  Template.createAccountButton.events = {
    "click .open-modal": function(e, t) {
      e.preventDefault();
      $("#loginModalButton").modal("hide");
      $("#createAccount").modal("show");
    }
  };

  Template.changePasswordButton.events = {
    "click .open-modal": function(e, t) {
      e.preventDefault();
      $("#loginModalButton").modal("hide")
      $("#changePassword").modal("show");
    }
  };

}