import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LetsConnectSubmissionService } from './lets-connect-submission.service';
import { CreateLetsConnectSubmissionDto } from './dto/create-lets-connect-submission.dto';
import { UpdateLetsConnectSubmissionDto } from './dto/update-lets-connect-submission.dto';
import { EmailService } from 'src/service/email/email.service';

@Controller('lets-connect-submission')
export class LetsConnectSubmissionController {
  constructor(
    private readonly letsConnectSubmissionService: LetsConnectSubmissionService,
    private readonly emailService: EmailService,
  ) {}

  @Post('/submit')
  create(@Body() createLetsConnectSubmissionDto: CreateLetsConnectSubmissionDto) {
    const submission = this.letsConnectSubmissionService.create(createLetsConnectSubmissionDto);
    return 
  }

  @Get()
  findAll() {
    return this.letsConnectSubmissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.letsConnectSubmissionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLetsConnectSubmissionDto: UpdateLetsConnectSubmissionDto,
  ) {
    return this.letsConnectSubmissionService.update(+id, updateLetsConnectSubmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.letsConnectSubmissionService.remove(+id);
  }
}
