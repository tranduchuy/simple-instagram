import nodemailer from 'nodemailer';

type MailOptions = {
    from: string;
    subject: string;
    to: string;
    html: string;
}

export const sendMailVerify = async (mailOptions: MailOptions) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.config_user,
            pass: process.env.config_password
        }
    });

    await transporter.sendMail(mailOptions, function (error, info) {
        console.log("check inside function: ", mailOptions);
        if (error) {
            return error;
        } else {
            return "Email verify success!";
        }
    });
};