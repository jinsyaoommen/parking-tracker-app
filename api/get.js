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
    const result = await dynamodb.call("get", params);
    if (result.Item) {
      // Return the retrieved item
      callback(null, success(result.Item));
    } else {
      callback(null, failure({ status: false, error: "Item not found." }));
    }
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
