import * as AWS from "aws-sdk";
const ses = new AWS.SES();

exports.handler = async (event) => {
  // イベントからキューのレコードをループ処理
  for (const record of event.Records) {
    // メッセージボディを JSON としてパース（例： { "to": "...", "subject": "...", "body": "..." } ）
    const { to, subject, body } = JSON.parse(record.body);
    const params = {
      Destination: { ToAddresses: [to] },
      Message: {
        Body: { Text: { Data: body } },
        Subject: { Data: subject },
      },
      Source: process.env.EMAIL_ORIGIN as string,
    };

    try {
      await ses.sendEmail(params).promise();
      console.log(`Email sent to ${to}`);
    } catch (err) {
      console.error(`Failed to send email to ${to}:`, err);
      // エラー時は再試行のためエラーを投げる（SQS の設定により再試行や DLQ への振り分けが行われます）
      throw err;
    }
  }
  return {};
};
