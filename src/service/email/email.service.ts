import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';


@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,  // Set environment variables for security
              pass: process.env.EMAIL_PASS,  // Email password or app-specific password
            },
          });
    }

    async sendEmail(to: string, subject: string, text: string, html: string) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to,
          subject,
          text,
          html,
        };
    
        try {
          const info = await this.transporter.sendMail(mailOptions);
          console.log('Email sent: ' + info.response);
          return info;
        } catch (error) {
          console.error('Error sending email: ', error);
          throw error;
        }
      }
}
