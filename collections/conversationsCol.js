conversationsCol = new Meteor.Collection("Conversations");

if(Meteor.isServer){
	// server publish the BargeUser collection
	Meteor.publish('conversationsCol', function (userID) {
		// Init the Global channel for the first time
		var cursor = conversationsCol.find({receiver: "Global"});
		if(cursor.count() == 0) {
			conversationsCol.insert({msg: "", date: 0, name: "", owner: userID, receiver: "Global"});
		}
		return conversationsCol.find({ $or: [{owner: userID}, {receiver: userID}, {receiver: "Global"}] }, {sort: {date: -1}});
	});
}