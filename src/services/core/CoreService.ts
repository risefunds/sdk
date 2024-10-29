import { inject, injectable, named } from 'inversify';
import { PlatformUserEntityService } from './PlatformUserEntityService';
import { CreativeUserEntityService } from './CreativeUserEntityService';
import { CampaignEntityService } from './CampaignEntityService';

@injectable()
export class CoreService {
  @inject('entity')
  @named('PlatformUserEntityService')
  PlatformUserEntityService!: PlatformUserEntityService;

  @inject('entity')
  @named('CreativeUserEntityService')
  CreativeUserEntityService!: CreativeUserEntityService;

  @inject('entity')
  @named('CampaignEntityService')
  CampaignEntityService!: CampaignEntityService;
}
