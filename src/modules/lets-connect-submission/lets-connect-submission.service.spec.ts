import { Test, TestingModule } from '@nestjs/testing';
import { LetsConnectSubmissionService } from './lets-connect-submission.service';

describe('LetsConnectSubmissionService', () => {
  let service: LetsConnectSubmissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LetsConnectSubmissionService],
    }).compile();

    service = module.get<LetsConnectSubmissionService>(LetsConnectSubmissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
