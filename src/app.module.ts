import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LetsConnectSubmissionModule } from './modules/lets-connect-submission/lets-connect-submission.module';
import { EmailService } from './service/email/email.service';

@Module({
  imports: [LetsConnectSubmissionModule],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
