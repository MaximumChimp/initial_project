require("dotenv").config();
const nodemailer = require("nodemailer");
async function sendEmail(email, code) {
  try {
    const smtpEndpoint = "smtp.gmail.com";
    const port = 465;
    var toAddress = email;
    const senderEmail = "arvincabrera37@gmail.com";
    const senderPassword = "jwmtrwmknwxladxw";
    var subject = "Verify your email";
    // The body of the email for recipients
    var body_html = `<!DOCTYPE> 
    <html>
      <body>
        <p>Your authentication code is : </p> <b>${code}</b>
      </body>
    </html>`;
    // Create the SMTP transport.
    let transporter = nodemailer.createTransport({
      host: smtpEndpoint,
      port: port,
      secure: true, // true for 465, false for other ports
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });
    // Specify the fields in the email.
    let mailOptions = {
      from: senderEmail,
      to: toAddress,
      subject: subject,
      html: body_html,
    };
    let info = await transporter.sendMail(mailOptions);
    return { error: false };
  } catch (error) {
    console.error("send-email-error", error);
    return {
      error: true,
      message: "Cannot send email",
    };
  }
}
module.exports = { sendEmail };