if(Meteor.isServer) {
	
	Meteor.methods({
	    userCheck: function() {
	    	console.log('executing userCheck with userID: ' + Meteor.userId());
	    	var userInfo;
			if (Meteor.userId() != null) {
				// If the user is logged in check if the user is a bargeUser
				var user = bargeUsers.find({accessID: Meteor.userId()}, {limit: 1});
				user.forEach(function (currentUser) {
					userInfo = currentUser;
					// The user is found in the bargeUsers collection
					console.log('Who logged in: ' + currentUser.name);
					console.log('User has mmsi: ' + currentUser.mmsi);
					// Check if the user exists in the onlineBargeUsers collection
					/*if(!onlineBargeUsers.find({name: currentUser.name, mmsi: currentUser.mmsi})) {
						// The user doesn't exists yet.
						// Add the user to the onlineBargeUsers collection
						console.log('Inserting user into onlineBargeUsers');
						onlineBargeUsers.insert({
							name: currentUser.name,
							mmsi: currentUser.mmsi
						});
					} else {
						console.log('The logged in user already exists in the onlineBargeUsers collection');
					}*/
				});
			} else {
				console.log('No userID!');
			}
			return userInfo;
	    }
	});
}