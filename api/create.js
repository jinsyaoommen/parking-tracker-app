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
    Item: {
      userId: data.email,
      // userId: event.requestContext.identity.cognitoIdentityId,
      checkinDate: data.checkinDate,
      checkinTime: data.checkinTime,
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
