import { inject, injectable } from 'inversify';
import { BackendService } from './BackendService';
import { ReferenceService } from './ReferenceService/ReferenceService';

@injectable()
export class BaseService {
  @inject(ReferenceService)
  referenceService!: ReferenceService;

  @inject(BackendService)
  backendService!: BackendService;
}
