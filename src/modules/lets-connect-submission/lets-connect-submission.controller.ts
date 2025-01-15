import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { LetsConnectSubmissionService } from './lets-connect-submission.service';
import { CreateLetsConnectSubmissionDto } from './dto/create-lets-connect-submission.dto';
import { UpdateLetsConnectSubmissionDto } from './dto/update-lets-connect-submission.dto';
import { EmailService } from 'src/service/email/email.service';
import { Throttle } from '@nestjs/throttler';
import { LetsConnectSubmission } from './entities/lets-connect-submission.entity';
import { EmailConstants, EmailRespMessage } from 'src/constants/email.constants';



@Controller('lets-connect-submission')
export class LetsConnectSubmissionController {
  constructor(private readonly letsConnectSubmissionService: LetsConnectSubmissionService) {}

  @Post('/submit')
  async create(@Body() createLetsConnectSubmissionDto: CreateLetsConnectSubmissionDto) {
    const { email, name } = createLetsConnectSubmissionDto;
    const submissionResp = new LetsConnectSubmission();
    if (!email || !name || name.trim().length === 0) {
      submissionResp.status = HttpStatus.BAD_REQUEST;
      submissionResp.message = EmailRespMessage.BAD_NAME_EMAIL;
      return submissionResp;
    }

    const submission = await this.letsConnectSubmissionService.create(
      createLetsConnectSubmissionDto,
    );

    if (submission.success) {
      const submissionResp = new LetsConnectSubmission();
      submissionResp.status = HttpStatus.OK;
      submissionResp.message = EmailRespMessage.SUCCESS;
      return submissionResp;
    } else {
      throw new HttpException(
        `${submission.response}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
