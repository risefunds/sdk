import { inject, injectable, named } from 'inversify';
import { PlatformUserEntityService } from './PlatformUserEntityService';
import { CreativeUserEntityService } from './CreativeUserEntityService';
import { CampaignEntityService } from './CampaignEntityService';
import { DonationEntityService } from './DonationEntityService';

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

  @inject('entity')
  @named('DonationEntityService')
  DonationEntityService!: DonationEntityService;
}
