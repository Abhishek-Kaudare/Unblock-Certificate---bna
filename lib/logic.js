/**
 * creates an asset
 * @param {org.unblockcerti.participant.user.addUser} userData
 * @transaction
 */

function    createUser(userData) {

    /**
     * 1. Validate the schedule data
     * If the date is a past date then throw an error
     */
    // var timeNow = new Date().getTime();
    // var schedTime = new Date(flightData.schedule).getTime();
    // if(schedTime < timeNow){
    //     throw new Error("Scheduled time cannot be in the past!!!");
    // }

    // Get the Asset Registry

    return getParticipantRegistry('org.unblockcerti.participant.user.User')
    
        .then(function(userRegistry){
            // Now add the Flight - global function getFactory() called
            var  factory = getFactory();

            var  NS =  'org.unblockcerti.participant.user';
            var  userId = "user1";
            var  user = factory.newResource(NS,'User',userId);
            user.userName = userData.userName;
            user.phoneNo = userData.phoneNo;
            user.address = userData.address;
            return userRegistry.add(user);
        });
}



