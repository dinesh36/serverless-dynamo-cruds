const Responses = require('../util/api-responses');
const Dynamo = require('../util/dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event ==>', event);

    const user = JSON.parse(event.body);

    const newUser = await Dynamo.create(user, tableName).catch(err => {
        console.log('Error in dynamo create', err);
        return null;
    });

    if(!newUser){
        return Responses._400({message: 'Failed to create the new user'});
    }

    return Responses._200(newUser);
}