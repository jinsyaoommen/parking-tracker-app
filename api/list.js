import * as dynamodb from "./lib/dynamodb";
import { success, failure } from "./lib/response";

export async function main(event, context, callback) {
  const params = {
    TableName: "parking-tracker",
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    // KeyConditionExpression: "userId = :userId",
    // ExpressionAttributeValues: {
    //   ":userId": event.requestContext.identity.cognitoIdentityId
    // }
    // ExpressionAttributeValues: {
    //   ":checkinDate": event.checkinDate
    // },
    // FilterExpression: "checkinDate = :checkinDate",
    AttributesToGet: [
      'userId', 'checkinDate', 'checkinTime', 'checkoutTime'
    ]
  };

  try {
    const result = await dynamodb.call("scan", params);
    // Return the matching list of items in response body
    callback(null, success(result.Items));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
