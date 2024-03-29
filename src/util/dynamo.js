const AWS= require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get (ID, TableName){
        const params = {
            TableName,
            Key: {
                ID
            }
        };

        const data = await documentClient
            .get(params)
            .promise();

        if(!data || !data.Item){
            throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`);
        }
        console.log(data);

        return data.Item;
    },

    async create (data, TableName){
        if(!data.ID){
            throw Error('Need id to be created');
        }

        const params = {
            TableName,
            Item: data
        };

        const res = await documentClient.put(params).promise();
        if(!res){
            throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`);
        }

        return data;
    },

    async update (ID, data, TableName){
        if(!ID){
            throw Error('Please provid id to update');
        }

        const updateItem = {ID, ...data};

        const params = {
            TableName,
            Item: updateItem
        };

        const res = await documentClient.put(params).promise();
        if(!res){
            throw Error(`There was an error updating ID of ${data.ID} in table ${TableName}`);
        }

        return updateItem;
    },

    async delete (ID, TableName){
        if(!ID){
            throw Error('Please provide id to delete');
        }

        const params = {
            TableName,
            Key: {
                ID
            }
        };

        const res = await documentClient.delete(params).promise();

        if(!res){
            throw Error(`There was an error updating ID of ${ID} in table ${TableName}`);
        }

        return res;
    }
}

module.exports = Dynamo;