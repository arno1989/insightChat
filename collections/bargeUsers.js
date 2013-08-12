bargeUsers = new Meteor.Collection("BargeUsers");

if(Meteor.isServer){
	// server publish the BargeUser collection
	Meteor.publish('bargeUsers', function (userId) {
		return bargeUsers.find({},{fields: {type: 0}});
	});
}