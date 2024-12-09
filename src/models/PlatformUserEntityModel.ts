import { Exclude, Expose, plainToClass } from 'class-transformer';
import { v4 } from 'uuid';
import { IFormBuilderAutoCompleteOption, IStripeObject } from '../types';
import { EntityModel, IBaseEntityModel } from './EntityModel';

export type IPlatformUserType = 'creative' | 'backer' | 'su';
interface IPlatformUserEntityModelDetails {
  type: IPlatformUserType[];
  country?: IFormBuilderAutoCompleteOption;
  state?: IFormBuilderAutoCompleteOption;
}
export interface IPlatformUserEntityModel extends IBaseEntityModel {
  details: IPlatformUserEntityModelDetails;
  stripeCustomer?: IStripeObject;
}

@Exclude()
export class PlatformUserEntityModel
  extends EntityModel<IPlatformUserEntityModel>
  implements IPlatformUserEntityModel
{
  static collection = 'PlatformUser';
  static parentCollection = ['Firebase'];

  @Expose()
  name!: string;

  @Expose()
  details!: IPlatformUserEntityModelDetails;

  @Expose()
  stripeCustomer?: IStripeObject;

  constructor(id = v4(), name = 'PlatformUser') {
    super(
      1,
      PlatformUserEntityModel.collection,
      PlatformUserEntityModel.parentCollection,
      { Firebase: id },
      id
    );
    this.details = {
      type: [],
    };
    this.name = name;
  }

  static fromJSON(json: IPlatformUserEntityModel): PlatformUserEntityModel {
    return plainToClass(PlatformUserEntityModel, json);
  }
}
