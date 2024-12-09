import { Exclude, Expose, plainToClass } from 'class-transformer';
import { v4 } from 'uuid';
import { EntityModel, IBaseEntityModel, IParentReference } from './EntityModel';
import { PlatformUserEntityModel } from './PlatformUserEntityModel';
import { CampaignEntityModel } from './CampaignEntityModel';
import {
  IDonationInitialValues,
  IStripeCheckoutSessionDetails,
  IStripeObject,
} from '../types';

export interface IDonationEntityModel extends IBaseEntityModel {
  details: IDonationInitialValues;
  stripeCheckoutSession?: IStripeObject;
  stripeCheckoutSessionDetails?: IStripeCheckoutSessionDetails;
}

@Exclude()
export class DonationEntityModel
  extends EntityModel<IDonationEntityModel>
  implements IDonationEntityModel
{
  static collection = 'Donation';
  static parentCollection = [
    PlatformUserEntityModel.collection,
    CampaignEntityModel.collection,
  ];

  @Expose()
  details!: IDonationInitialValues;

  @Expose()
  name: string = 'Donation';

  @Expose()
  stripeCheckoutSession?: IStripeObject;

  @Expose()
  stripeCheckoutSessionDetails?: IStripeCheckoutSessionDetails;

  constructor(
    parentReference: IParentReference,
    details: IDonationInitialValues,
    id = v4()
  ) {
    super(
      1,
      DonationEntityModel.collection,
      DonationEntityModel.parentCollection,
      parentReference,
      id
    );
    this.details = details;
  }

  static fromJSON(json: IDonationEntityModel): DonationEntityModel {
    return plainToClass(DonationEntityModel, json);
  }
}
