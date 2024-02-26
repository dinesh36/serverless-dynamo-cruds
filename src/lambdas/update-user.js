const Responses = require('../util/api-responses');
const Dynamo = require('../util/dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event ==>', event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({message: 'Id not found in route'});
    }

    const ID = event.pathParameters.ID;
    const user = JSON.parse(event.body);

    const updatedUser = await Dynamo.update(ID, user, tableName).catch(err => {
        console.log('Error in dynamo update', err);
        return null;
    });

    if(!updatedUser){
        return Responses._400({message: 'Failed to create the new user'});
    }

    return Responses._200(updatedUser);
}