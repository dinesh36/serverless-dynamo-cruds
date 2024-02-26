const Responses = require('../util/api-responses');
const Dynamo = require('../util/dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event ==>', event)
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({message: 'Id not found in route'});
    }

    const ID = event.pathParameters.ID;
    const user = await Dynamo.get(ID, tableName).catch(err =>{
        console.log('error in getting the user', err);
        return null;
    });

    if(!user){
        return Responses._400({message: 'Data not found for the provided id'});
    }

    return Responses._200(user);
}