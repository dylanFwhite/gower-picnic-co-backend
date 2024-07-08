import nodemailer from "nodemailer";
// import htmlToText from "html-to-text";

export default class Email {
  constructor(customer) {
    this.to = customer.email;
    this.firstName = customer.name.split(" ")[0];
    this.admin = `Gower Picnic Company <${process.env.ADMIN_EMAIL}>`;
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
  async send(subject, template) {
    const mailOptions = {
      from: this.admin,
      to: this.to,
      subject,
      html: template,
      // text: htmlToText.fromString(template),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendConfirmation(customer, order) {
    const customerMailOptions = {
      from: this.from,
      to: this.admin,
      subject: "Thank you for your order!",
      // html:
      text: "Thank you for ordering from the Gower Picnic Company",
    };
    const adminMailOptions = {
      from: this.admin,
      to: this.admin,
      subject: "New Order",
      // html:
      text: `New order from ${customer.email}.
      Products: ${order.products}.
      Date: ${order.collectionDate}`,
    };
    await this.newTransport().sendMail(customerMailOptions);
    await this.newTransport().sendMail(adminMailOptions);
  }
}
