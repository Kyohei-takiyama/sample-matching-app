import AWS from "aws-sdk";
const sqs = new AWS.SQS({ region: "ap-northeast-1" }); // 適切なリージョンを指定

export const sendEmail = (emailPayload: EmailPayload): void => {
  const params = {
    QueueUrl: process.env.SQS_ENDPOINT as string,
    MessageBody: JSON.stringify(emailPayload),
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.error("Error sending message:", err);
    } else {
      console.log("Message sent:", data.MessageId);
    }
  });
};
