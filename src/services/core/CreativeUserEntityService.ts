import { injectable } from 'inversify';
import {
  CreativeUserEntityModel,
  ICreativeUserEntityModel,
} from '../../models';
import { EntityService, IEntityExtensionService } from './EntityService';

@injectable()
export class CreativeUserEntityService
  extends EntityService<CreativeUserEntityModel, ICreativeUserEntityModel>
  implements
    IEntityExtensionService<CreativeUserEntityModel, ICreativeUserEntityModel>
{
  static serviceName = 'CreativeUserEntityService';
  get serviceName(): string {
    return CreativeUserEntityService.serviceName;
  }

  constructor() {
    super();
    this.init(
      CreativeUserEntityModel.collection,
      CreativeUserEntityModel.parentCollection,
      {
        from: async (json) => {
          const jobRequest = CreativeUserEntityModel.fromJSON(json);

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
