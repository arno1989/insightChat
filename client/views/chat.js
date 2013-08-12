/**
 * Global subscribe handlers
 */

bargeSubHandler = null;
convSubHandler = null;

/**
 * Subscribing to datababes
 */
Template.mainContainer.getUserInfo=function() {
  Deps.autorun(function() {
    // Check if the user logged in
    Meteor.call("userCheck", function (error, userInfo) {
        if(error) {
          console.log('Error getting user information! ' + error);
        } else {
          console.log('Hoi ' + userInfo.name + ', jij hebt mmsi nr: ' + userInfo.mmsi);
          /**
           * Subscribing to collections
           */
          bargeSubHandler = Meteor.subscribe("bargeUsers", Meteor.userId());
          convSubHandler = Meteor.subscribe("conversationsCol", Meteor.userId());
          Meteor.subscribe("chatCollection");
          $('#chatroom').html(Meteor.render(Template.chatroom));
        }
      });
  });
}


/**
 * Add linking for the navigation bar.
 * These link to different Templates
 */
Meteor.Router.add({
  '/'           : 'chatroom'
});

Template.navigation.getToken=function() {
  return Meteor.userId();
}