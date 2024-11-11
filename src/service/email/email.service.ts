import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import { EmailConstants } from 'src/constants/email.constants';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    // dev credentials
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '4590c05d30ae76',
        pass: '********a8f3',
      },
    });
    // Prod credentials
    // this.transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: process.env.EMAIL_USER,  // Set environment variables for security
    //       pass: process.env.EMAIL_PASS,  // Email password or app-specific password
    //     },
    //   });
  }

  private generateEmailContent(templatePath: string, data: any): string {
    const template = readFileSync(templatePath, 'utf-8');
    const compiledTemplate = Handlebars.compile(template);
    return compiledTemplate(data);
  }

  private async sendEmail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
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

  async sendSubmittedTYEmail(toEmail: string, username: string) {
    const templatePath = path.resolve(
      'static',
      'templates',
      'email',
      'submitted-thank-you.hbs',
    );
    console.log(templatePath);
    const htmlContent = this.generateEmailContent(templatePath, {
      username,
    });

    await this.sendEmail(toEmail, EmailConstants.SUBJECT_SUBMISSTION_THANKYOU, htmlContent);
  }
}
