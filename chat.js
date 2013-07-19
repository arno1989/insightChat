chatCollection = new Meteor.Collection('ChatCollection');

if (Meteor.isClient) {

  Template.chatroom.msgs=function() {
    return chatCollection.find({},{sort: {date: -1}});
  }

  Template.chatroom.passTime=function(timestamp) {
    // Convert timestamp to readable time: 18:30
    var time = new Date(timestamp);
    var hours = time.getHours(); // get hours
    var min = time.getMinutes(); // get minutes
    hours = hours.toString();  // convert to string
    if(hours.length == 1) {
      hours = '0' + hours;   // prepend '0' if length = 1
    }
    min = min.toString();
    if(min.length == 1) {
      min = '0' + min;
    }
    return hours + ':' + min;
  }

  Template.chatroom.events({
    'click .msg-send': function() {
      var msgVal = $('.msg').val();
      var timestamp = new Date().getTime();
      //var user = Meteor.users.findOne();
      chatCollection.insert({
        msg: msgVal,
        date: timestamp,
        owner: "Control tower"//user.profile.name
      });
      $('.msg').val('');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
