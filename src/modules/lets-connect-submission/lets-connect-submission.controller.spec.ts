import { Test, TestingModule } from '@nestjs/testing';
import { LetsConnectSubmissionController } from './lets-connect-submission.controller';
import { LetsConnectSubmissionService } from './lets-connect-submission.service';

describe('LetsConnectSubmissionController', () => {
  let controller: LetsConnectSubmissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LetsConnectSubmissionController],
      providers: [LetsConnectSubmissionService],
    }).compile();

    controller = module.get<LetsConnectSubmissionController>(LetsConnectSubmissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
