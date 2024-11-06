import { Exclude, Expose, plainToClass } from 'class-transformer';
import { v4 } from 'uuid';
import { EntityModel, IBaseEntityModel, IParentReference } from './EntityModel';
import { PlatformUserEntityModel } from './PlatformUserEntityModel';
import { ICreativeProfileInitialValues } from '../formSchemas/CreativeProfile';
import { ICreativeDocumentsInitialValues } from '../formSchemas/CreativeDocuments';

export interface ICreativeUserEntityModel extends IBaseEntityModel {
  details: ICreativeProfileInitialValues;
  documents: ICreativeDocumentsInitialValues;
  featured: Array<string>;
  portoflioPercentage?: number;
}

export const featuredCreativeOptions = ['community', 'home'];

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
  featured: Array<string> = [];

  @Expose()
  details!: ICreativeProfileInitialValues;

  @Expose()
  email!: string;

  @Expose()
  documents!: ICreativeDocumentsInitialValues;

  @Expose()
  portoflioPercentage: number = 0;

  @Expose()
  isVerified: boolean = false;

  @Expose()
  profileFeaturedEmailSent: boolean = false;

  @Expose()
  profileCompletedEmailSent: boolean = false;

  constructor(parentReference: IParentReference, id = v4()) {
    super(
      1,
      CreativeUserEntityModel.collection,
      CreativeUserEntityModel.parentCollection,
      parentReference,
      id
    );
  }

  getPercentage(): number {
    let percengtage = 0;
    if (!this.details) {
      return percengtage;
    }

    // first name
    if (this.details.firstName) {
      percengtage += 10;
    }

    // last name
    if (this.details.lastName) {
      percengtage += 10;
    }

    // country
    if (this.details.country) {
      percengtage += 5;
    }

    // sin
    if (this.documents?.sin) {
      percengtage += 15;
    }

    // digitalPhoto
    if (this.documents?.digitalPhoto) {
      percengtage += 15;
    }
    // identity
    if (this.documents?.identity) {
      percengtage += 15;
    }
    // sinPhoto
    if (this.documents?.sinPhoto) {
      percengtage += 15;
    }
    // proofOfAdress
    if (this.documents?.proofOfAdress) {
      percengtage += 15;
    }

    return percengtage;
  }

  static fromJSON(json: ICreativeUserEntityModel): CreativeUserEntityModel {
    return plainToClass(CreativeUserEntityModel, json);
  }
}
