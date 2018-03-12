import * as dynamodb from "./lib/dynamodb";
import { success, failure } from "./lib/response";

export async function main(event, context, callback) {
  const params = {
    TableName: "parking-total-slots",
    AttributesToGet: [
      'totalSlots'
    ]
  };

  try {
    const result = await dynamodb.call("scan", params);

    if (result.Items) {
      // Return the retrieved item
      callback(null, success(result.Items));
    } else {
      callback(null, failure({ status: false, error: "Item not found." }));
    }
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
