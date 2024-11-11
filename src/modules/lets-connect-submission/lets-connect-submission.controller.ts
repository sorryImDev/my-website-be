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

    if (!email || !name) {
      throw new HttpException(' Email and name are required fields.', HttpStatus.BAD_REQUEST);
    }

    const submission = await this.letsConnectSubmissionService.create(
      createLetsConnectSubmissionDto,
    );

    if (submission.success) {
      const submissionResp = new LetsConnectSubmission();
      submissionResp.statusCode = HttpStatus.OK;
      submissionResp.message = EmailRespMessage.SUCCESS;
      return submissionResp;
    } else {
      throw new HttpException(
        `Failed to sene email: ${submission.error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
