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
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
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
    const templatePath = path.resolve('static', 'templates', 'email', 'submitted-thank-you.hbs');
    console.log(templatePath);
    const htmlContent = this.generateEmailContent(templatePath, {
      username,
    });
    try {
      const info = await this.sendEmail(
        toEmail,
        EmailConstants.SUBJECT_SUBMISSTION_THANKYOU,
        htmlContent,
      );
      return {
        success: true,
        response: info.response,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
