import { Module } from '@nestjs/common';
import { LetsConnectSubmissionService } from './lets-connect-submission.service';
import { LetsConnectSubmissionController } from './lets-connect-submission.controller';
import { EmailService } from 'src/service/email/email.service';

@Module({
  controllers: [LetsConnectSubmissionController],
  providers: [LetsConnectSubmissionService, EmailService],
})
export class LetsConnectSubmissionModule {}
