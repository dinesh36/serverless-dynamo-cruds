const Responses = require('../util/api-responses');

exports.handler = async event => {
    console.log('event ==>', event)
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({message: 'Id not found in route'});
    }

    const ID = event.pathParameters.ID;
    if (data[ID]) {
        return Responses._200(data[ID]);
    }

    return Responses._400({message: 'Data not found for the provided id'});
}

const data = {
    1234: { name: 'Anna Jones', age: 25, job: 'journalist' },
    7893: { name: 'Chris Smith', age: 52, job: 'teacher' },
    5132: { name: 'Tom Hague', age: 23, job: 'plasterer' },
};