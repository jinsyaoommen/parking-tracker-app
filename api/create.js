import uuid from "uuid";
import AWS from "aws-sdk";
import moment from 'moment';

import * as dynamodb from "./lib/dynamodb";
import { success, failure } from "./lib/response";

export async function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: "parking-tracker",
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'noteId': a unique uuid
    // - 'content': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: data.email,
      // userId: event.requestContext.identity.cognitoIdentityId,
      // checkinDate: moment().startOf('day').format('YYYY-MM-DD'),
      checkinDate: data.checkinDate,
      checkinTime: data.checkinTime,
      // attachment: data.attachment,
      lastModifiedTimestamp: new Date().getTime()
    }
  };

  try {
    await dynamodb.call("put", params);
    callback(null, success(params.Item));
  } catch(e) {
    callback(null, failure({ status: false }));
  }
}
