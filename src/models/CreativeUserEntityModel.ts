import { Exclude, Expose, plainToClass } from 'class-transformer';
import { v4 } from 'uuid';
import { EntityModel, IBaseEntityModel, IParentReference } from './EntityModel';
import { PlatformUserEntityModel } from './PlatformUserEntityModel';
import { ICreativeProfileInitialValues } from '../formSchemas/CreativeProfile';

export interface ICreativeUserEntityModel extends IBaseEntityModel {
  details: ICreativeProfileInitialValues;
  featured?: Array<string>;
  portoflioPercentage?: number;
}

@Exclude()
export class CreativeUserEntityModel
  extends EntityModel<ICreativeUserEntityModel>
  implements ICreativeUserEntityModel
{
  static collection = 'CreativeUser';
  static parentCollection = [PlatformUserEntityModel.collection];

  @Expose()
  name: string = 'Creative User';

  @Expose()
  details!: ICreativeProfileInitialValues;

  constructor(parentReference: IParentReference, id = v4()) {
    super(
      1,
      CreativeUserEntityModel.collection,
      CreativeUserEntityModel.parentCollection,
      parentReference,
      id
    );
  }

  static fromJSON(json: ICreativeUserEntityModel): CreativeUserEntityModel {
    return plainToClass(CreativeUserEntityModel, json);
  }
}
