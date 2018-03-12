import * as dynamodb from "./lib/dynamodb";
import { success, failure } from "./lib/response";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "parking-tracker",
    Key: {
      userId: data.email,
      checkinDate: event.pathParameters.checkinDate
    },
    UpdateExpression: "SET checkoutTime = :checkoutTime",
    ExpressionAttributeValues: {
      ":checkoutTime": data.checkoutTime ? data.checkoutTime : null
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamodb.call("update", params);
    callback(null, success({ status: true }));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
