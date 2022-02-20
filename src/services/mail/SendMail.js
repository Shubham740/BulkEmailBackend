const nodemailer = require("nodemailer");

var sendEmail= async function main(sendTo,body) {
    // let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'mailerbulk1@gmail.com', // generated ethereal user
          pass: 'Test@123', // generated ethereal password
        },
      });
       // send mail with defined transport object
       let info = await transporter.sendMail({
    from: 'mailerbulk1@gmail.com', // sender address
    to: sendTo, // list of receivers
    subject: "Bulk mailer subject" , // Subject line
    text: body, // plain text body
    html: body, // html body
  });

  return info.messageId;
}

exports.sendEmail= sendEmail;
