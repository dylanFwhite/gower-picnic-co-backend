import nodemailer from "nodemailer";

export default class Email {
  constructor(customer) {
    this.to = customer.email;
    this.firstName = customer.name.split(" ")[0];
    this.from = `Gower Picnic Company <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // Sendgrid
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  // Send the actual email
  async send(subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: "Thank you for ordering from the Gower Picnic Company",
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }
}
