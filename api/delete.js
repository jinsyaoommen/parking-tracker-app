import * as dynamodb from "./lib/dynamodb";
import { success, failure } from "./lib/response";

export async function main(event, context, callback) {
  const params = {
    TableName: "parking-tracker",
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      checkinDate: event.pathParameters.checkinDate
    }
  };

  try {
    const result = await dynamodb.call("delete", params);
    callback(null, success({ status: true }));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
