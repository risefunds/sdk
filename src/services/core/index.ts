import { Container } from 'inversify';
import { BaseService, baseServiceContainer } from '../base';
import { CoreService } from './CoreService';
import { PlatformUserEntityService } from './PlatformUserEntityService';
import { CreativeUserEntityService } from './CreativeUserEntityService';
import { CampaignEntityService } from './CampaignEntityService';
import { DonationEntityService } from './DonationEntityService';

export * from './EntityService';
const coreServiceContainer = new Container({ defaultScope: 'Singleton' });

coreServiceContainer
  .bind('base')
  .toConstantValue(baseServiceContainer.resolve<BaseService>(BaseService));

coreServiceContainer.bind<CoreService>(CoreService).toSelf();

coreServiceContainer
  .bind<PlatformUserEntityService>('entity')
  .to(PlatformUserEntityService)
  .whenTargetNamed('PlatformUserEntityService');

coreServiceContainer
  .bind<CreativeUserEntityService>('entity')
  .to(CreativeUserEntityService)
  .whenTargetNamed('CreativeUserEntityService');

coreServiceContainer
  .bind<CampaignEntityService>('entity')
  .to(CampaignEntityService)
  .whenTargetNamed('CampaignEntityService');

coreServiceContainer
  .bind<DonationEntityService>('entity')
  .to(DonationEntityService)
  .whenTargetNamed('DonationEntityService');

export {
  coreServiceContainer,
  CoreService,
  PlatformUserEntityService,
  CreativeUserEntityService,
  CampaignEntityService,
  DonationEntityService,
};
