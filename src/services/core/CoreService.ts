import { inject, injectable, named } from 'inversify';
import { PlatformUserEntityService } from './PlatformUserEntityService';
import { CreativeUserEntityService } from './CreativeUserEntityService';

@injectable()
export class CoreService {
  @inject('entity')
  @named('PlatformUserEntityService')
  PlatformUserEntityService!: PlatformUserEntityService;

  @inject('entity')
  @named('CreativeUserEntityService')
  CreativeUserEntityService!: CreativeUserEntityService;
}
