import { Injectable } from '@nestjs/common';
import { CreateLetsConnectSubmissionDto } from './dto/create-lets-connect-submission.dto';
import { UpdateLetsConnectSubmissionDto } from './dto/update-lets-connect-submission.dto';

@Injectable()
export class LetsConnectSubmissionService {
  create(createLetsConnectSubmissionDto: CreateLetsConnectSubmissionDto) {
    console.log(createLetsConnectSubmissionDto);
    return 'This action adds a new letsConnectSubmission';
  }

  findAll() {
    return `This action returns all letsConnectSubmission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} letsConnectSubmission`;
  }

  update(id: number, updateLetsConnectSubmissionDto: UpdateLetsConnectSubmissionDto) {
    return `This action updates a #${id} letsConnectSubmission`;
  }

  remove(id: number) {
    return `This action removes a #${id} letsConnectSubmission`;
  }
}
