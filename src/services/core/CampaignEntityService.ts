import { injectable } from 'inversify';
import { CampaignEntityModel, ICampaignEntityModel } from '../../models';
import { EntityService, IEntityExtensionService } from './EntityService';

@injectable()
export class CampaignEntityService
  extends EntityService<CampaignEntityModel, ICampaignEntityModel>
  implements IEntityExtensionService<CampaignEntityModel, ICampaignEntityModel>
{
  static serviceName = 'CampaignEntityService';
  get serviceName(): string {
    return CampaignEntityService.serviceName;
  }

  constructor() {
    super();
    this.init(
      CampaignEntityModel.collection,
      CampaignEntityModel.parentCollection,
      {
        from: async (json) => {
          const jobRequest = CampaignEntityModel.fromJSON(json);

          return jobRequest;
        },
        to: (classObject) => {
          return {
            ...classObject.toJSON(),
          };
        },
      }
    );
  }
}
