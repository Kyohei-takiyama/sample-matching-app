import AWS from "aws-sdk";
const sqs = new AWS.SQS({ region: "ap-northeast-1" }); // 適切なリージョンを指定

export const sendEmail = (emailPayload: EmailPayload): Promise<string> => {
  const params = {
    QueueUrl: process.env.SQS_ENDPOINT as string,
    MessageBody: JSON.stringify(emailPayload),
  };

  console.log("Sending email to SQS:", emailPayload);

  return new Promise((resolve, reject) => {
    sqs.sendMessage(params, (err, data) => {
      if (err) {
        console.error("Failed to send email to SQS:", err);
        reject(err.message);
      } else {
        console.log("Email sent to SQS:", data.MessageId);
        resolve(data.MessageId as string);
      }
    });
  });
};
