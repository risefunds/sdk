import { injectable } from 'inversify';
import {
  PlatformUserEntityModel,
  IPlatformUserEntityModel,
} from '../../models/';
import { EntityService, IEntityExtensionService } from './EntityService';

@injectable()
export class PlatformUserEntityService
  extends EntityService<PlatformUserEntityModel, IPlatformUserEntityModel>
  implements
    IEntityExtensionService<PlatformUserEntityModel, IPlatformUserEntityModel>
{
  static serviceName = 'PlatformUserEntityService';
  get serviceName(): string {
    return PlatformUserEntityService.serviceName;
  }

  constructor() {
    super();
    this.init(
      PlatformUserEntityModel.collection,
      PlatformUserEntityModel.parentCollection,
      {
        from: async (json) => {
          return PlatformUserEntityModel.fromJSON(json);
        },
      }
    );
  }
}
