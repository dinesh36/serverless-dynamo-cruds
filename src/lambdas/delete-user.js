const Responses = require('../util/api-responses');
const Dynamo = require('../util/dynamo');

// const tableName = process.env.tableName;
const tableName = 'dynamoCrudTest';

exports.handler = async event => {
    console.log('event ==>', event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({message: 'Id not found in route'});
    }

    const ID = event.pathParameters.ID;

    const deletedUser = await Dynamo.delete(ID, tableName).catch(err => {
        console.log('Error in dynamo delete', err);
        return null;
    });

    if(!deletedUser){
        return Responses._400({message: 'Failed to delete user'});
    }

    return Responses._200({message: `User deleted with id ${ID}`});

};