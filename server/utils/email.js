import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async ({ email, subject, message }) => {
  // Configurazione email
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: subject,
    text: message,
    // html: htmlVersion, // versione HTML opzionale
  };

  // Invia email
  await transporter.sendMail(mailOptions);
};

export default sendEmail; 