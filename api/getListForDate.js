import * as dynamodb from "./lib/dynamodb";
import { success, failure } from "./lib/response";

export async function main(event, context, callback) {
  const params = {
    TableName: "parking-tracker",
    ExpressionAttributeValues: {
      ":checkinDate": event.pathParameters.checkinDate
    },
    FilterExpression: "checkinDate = :checkinDate"
  };

  try {
    const result = await dynamodb.call("scan", params);

    callback(null, success(result.Items));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}
