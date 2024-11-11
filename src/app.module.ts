import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LetsConnectSubmissionModule } from './modules/lets-connect-submission/lets-connect-submission.module';
import { EmailService } from './service/email/email.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    LetsConnectSubmissionModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 5, //per ip-address
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EmailService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
