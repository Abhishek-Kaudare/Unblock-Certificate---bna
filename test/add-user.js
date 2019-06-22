const userNamespace = 'org.unblockcerti.participant.user';
const userType = 'User';

// 1. Connect
const bnUtil = require('./bn-connection-util');
bnUtil.connect(main);

function main(error){
    // Check for the connection error
    if(error){
        console.log(error);
        process.exit(1);
    }

    return bnUtil.connection.getParticipantRegistry(userNamespace+'.'+userType).then((registry)=>{
        console.log('1. Received Registry: ', registry.id);

        // Utility method for adding the aircrafts
        addUser(registry);

    }).catch((error)=>{
        console.log(error);
       // bnUtil.disconnect();
    });
}

/**
 * Creates two resources instances CRAFT01 & CRAFT02
 * @param {*} registry This is of type AssetRegistry
 */
function    addUser(registry){
    const  bnDef = bnUtil.connection.getBusinessNetwork();
    const  factory = bnDef.getFactory();
    // Instance#1
    let    userResource = factory.newResource(userNamespace,userType,'user2');
    // aircraftResource.setPropertyValue('userId','user1');
    userResource.setPropertyValue('userName','Athul1');
    userResource.setPropertyValue('phoneNo','99306462203');
    userResource.setPropertyValue('address','dsfasfasd2fs');

    return registry.add(userResource).then(()=>{
        console.log('Added the Resources successfully!!!');
        bnUtil.disconnect();
    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });
}
