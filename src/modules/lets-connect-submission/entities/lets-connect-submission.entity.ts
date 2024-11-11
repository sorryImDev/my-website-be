import { HttpStatus } from '@nestjs/common';

export class LetsConnectSubmission {
  statusCode: HttpStatus;
  message: string;
}
