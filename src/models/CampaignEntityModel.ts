import { Exclude, Expose, plainToClass } from 'class-transformer';
import { v4 } from 'uuid';
import { EntityModel, IBaseEntityModel, IParentReference } from './EntityModel';
import { PlatformUserEntityModel } from './PlatformUserEntityModel';
import { CreativeUserEntityModel } from './CreativeUserEntityModel';
import { ICampaignBasicsInitialValues } from '../formSchemas/CampaignBasics';
import { IGenericMediaObject, IFormBuilderAutoCompleteOption } from '../types';

export interface ICampaignEntityModel
  extends IBaseEntityModel,
    ICampaignBasicsInitialValues {
  featured: Array<string>;
}

export const featuredCampaignOptions = ['showcase', 'ecosystem', 'collaborate'];

@Exclude()
export class CampaignEntityModel
  extends EntityModel<ICampaignEntityModel>
  implements ICampaignEntityModel
{
  static collection = 'Campaign';
  static parentCollection = [
    PlatformUserEntityModel.collection,
    CreativeUserEntityModel.collection,
  ];

  @Expose()
  name: string = 'Campaign';

  @Expose()
  featured: Array<string> = [];

  @Expose()
  campaignTitle!: string;

  @Expose()
  campaignCard: IGenericMediaObject | undefined;

  @Expose()
  campaignTagline: string | undefined;

  @Expose()
  campaignLocation: string | undefined;

  @Expose()
  campaignCategory: IFormBuilderAutoCompleteOption | undefined;

  @Expose()
  campaignTags: IFormBuilderAutoCompleteOption[] | undefined;

  @Expose()
  campaignDuration!: number;

  //   [key: string]:
  //     | IFormBuilderBaseValuePrimitiveType
  //     | IFormBuilderBaseValueComplexType;

  constructor(parentReference: IParentReference, id = v4()) {
    super(
      1,
      CampaignEntityModel.collection,
      CampaignEntityModel.parentCollection,
      parentReference,
      id
    );
  }

  static fromJSON(json: ICampaignEntityModel): CampaignEntityModel {
    return plainToClass(CampaignEntityModel, json);
  }
}
