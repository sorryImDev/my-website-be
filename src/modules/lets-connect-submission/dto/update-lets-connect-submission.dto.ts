import { PartialType } from '@nestjs/mapped-types';
import { CreateLetsConnectSubmissionDto } from './create-lets-connect-submission.dto';

export class UpdateLetsConnectSubmissionDto extends PartialType(CreateLetsConnectSubmissionDto) {}
