import nodemailer from 'nodemailer';

type MailOptions = {
    from: string;
    subject: string;
    to: string;
    html: string;
}

export const sendMailVerify = async (mailOptions: MailOptions): Promise<any> => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.config_user,
            pass: process.env.config_password,
        },
    });

    await transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return error;
        }
        return 'Email verify success!';
    });
};
