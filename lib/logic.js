/**
 * creates an asset
 * @param {org.unblockcerti.participant.user.addUser} userData
 * @transaction
 */

function    createUser(userData) {

    return getParticipantRegistry('org.unblockcerti.participant.user.User')
    
        .then(function(userRegistry){
            // Now add the Flight - global function getFactory() called
            var  factory = getFactory();

            var  NS =  'org.unblockcerti.participant.user';
            var  userId = userData.prn;
            var  user = factory.newResource(NS,'User',userId);
            user.userName = userData.userName;
            user.phoneNo = userData.phoneNo;
            user.address = userData.address;
            user.prn = userData.prn;
            return userRegistry.add(user);
            // .then(function(){
            //     const connectionProfile = {
            //         "name":"hlfv1","x-type":"hlfv1","x-commitTimeout":300,"version":"1.0.0","client":{"organization":"Org1","connection":{"timeout":{"peer":{"endorser":"300","eventHub":"300","eventReg":"300"},"orderer":"300"}}},"channels":{"composerchannel":{"orderers":["orderer.example.com"],"peers":{"peer0.org1.example.com":{}}}},"organizations":{"Org1":{"mspid":"Org1MSP","peers":["peer0.org1.example.com"],"certificateAuthorities":["ca.org1.example.com"]}},"orderers":{"orderer.example.com":{"url":"grpc://localhost:7050"}},"peers":{"peer0.org1.example.com":{"url":"grpc://localhost:7051"}},"certificateAuthorities":{"ca.org1.example.com":{"url":"http://localhost:7054","caName":"ca.org1.example.com"}}
            //     };
            
            //     const deployerMetadata = {
            //         "version":1,"userName":userData.userName,"businessNetwork":"unblock_certificates","enrollmentSecret":userData.prn
            //     };
            //     const idCardData = new IdCard(deployerMetadata, connectionProfile);
            //     const idCardName = userData.userName+'@unblock_certificates';
            //     return adminConnection.importCard(idCardName, idCardData)
            //     .then((x)=>{console.log(x)});
            // });
        });
}
/** 
* @param {org.unblockcerti.user.application.submitApplication} formData
* @transaction
*/
function submitApplication(formData){
    return getAssetRegistry('org.unblockcerti.user.application.Application')
        .then(function(applicationRegistery){
            var factory = getFactory();
            var  NS =  'org.unblockcerti.user.application';
            var  applicationId = formData.applicationId;
            var  app = factory.newResource(NS,'Application',applicationId);
            app.fullName = formData.fullName;
            app.age = formData.age;
            app.address = formData.address;
            app.document1path = formData.document1path;
            app.document2path = formData.document2path;
            app.status = 0;
            return applicationRegistery.add(app);
        })
}

/** 
* @param {org.unblockcerti.user.application.verifyApplication} formVerifData
* @transaction
*/

function verifyApplication(formVerifData){
    return getAssetRegistry('org.unblockcerti.user.application.Application').then(function(res){
            var factory = getFactory();
            var  NS =  'org.unblockcerti.user.application';
            var  applicationId = formVerifData.applicationId; 
            var newResource = factory.newResource(NS,'Application',applicationId);
            newResource.fullName = formVerifData.fullName;
            newResource.age = formVerifData.age;
            newResource.address = formVerifData.address;
            newResource.document1path = formVerifData.document1path;
            newResource.document2path = formVerifData.document2path;
            newResource.status = 1;
            return res.update(newResource);
    });
}



