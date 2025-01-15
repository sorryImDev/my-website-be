import { HttpStatus } from '@nestjs/common';

export class LetsConnectSubmission {
  status: HttpStatus;
  message: string;
}
