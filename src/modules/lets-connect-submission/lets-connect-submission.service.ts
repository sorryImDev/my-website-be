import { Injectable } from '@nestjs/common';
import { CreateLetsConnectSubmissionDto } from './dto/create-lets-connect-submission.dto';
import { EmailService } from 'src/service/email/email.service';

@Injectable()
export class LetsConnectSubmissionService {
  constructor(private readonly emailService: EmailService) {}

  async create(createLetsConnectSubmissionDto: CreateLetsConnectSubmissionDto) {
    console.log(createLetsConnectSubmissionDto);
    const { email, name } = createLetsConnectSubmissionDto;
    const result = await this.emailService.sendSubmittedTYEmail(email, name);
    return result;
  }
}
