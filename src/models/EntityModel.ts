import { Exclude, Expose, instanceToPlain, Type } from 'class-transformer';
import { v4 } from 'uuid';

export type IParentReference = {
  [key: string]: string;
};

export interface IBareBoneModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  archive: boolean;
  parentReference: IParentReference;
}

export interface IBaseEntityModel extends IBareBoneModel {
  name: string;
}

export interface IBareBoneModelExtension extends IBareBoneModel {
  toJSON(): unknown;
  getPubFileRef(): string;
  getPrvFileRef(): string;
  relationshipKeyInChild: string;
  collection: string;
  parentCollection: string[];
  getSingleParentReference(parentCollection: string): string | undefined;
  getSingleParentMandatoryReference(parentCollection: string): string;
}

export interface IEntityModelExtension extends IBareBoneModelExtension {
  name: string;
}

@Exclude()
export class EntityModel<Extension> implements IBareBoneModelExtension {
  @Expose()
  @Type(() => Date)
  createdAt: Date = new Date();

  @Expose()
  @Type(() => Date)
  updatedAt: Date = new Date();

  @Expose()
  id: string;

  @Expose()
  parentReference: IParentReference = {};

  @Expose()
  version: number;

  @Expose()
  archive: boolean;

  get relationshipKeyInChild(): string {
    return `parentReference.${this.collection}`;
  }

  getSingleParentReference = (parentCollection: string): string | undefined => {
    const connection = this.parentReference[parentCollection];

    if (!connection) return undefined;
    return connection;
  };

  getSingleParentMandatoryReference = (parentCollection: string): string => {
    const reference = this.getSingleParentReference(parentCollection);
    if (!reference)
      throw new Error(`${parentCollection} reference not defined`);
    return reference;
  };

  constructor(
    version: number,
    public collection: string,
    public parentCollection: string[],
    parentReference: IParentReference,
    id = v4()
  ) {
    if (!version) throw new Error('Version is not defined.');

    this.initTimeStamps();

    this.parentReference = parentReference;
    this.collection = collection;
    this.archive = false;
    this.id = id;
    this.version = version;
  }

  initTimeStamps(createdAt = new Date(), updatedAt = new Date()): void {
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON(): Extension {
    this.updatedAt = new Date();
    if (
      Object.keys(this.parentReference).some((prk) =>
        this.parentCollection.includes(prk) ? false : true
      )
    )
      throw new Error(
        `Parent relationship ambiguous. Parents: ${this.parentCollection.join(
          ','
        )}`
      );

    if (
      Object.entries(this.parentReference).some((v) => {
        return Array.isArray(v) ? false : true;
      })
    )
      throw new Error('Parent relationship can only be array.');

    if (
      Object.entries(this.parentReference).some((v) => {
        return v.length > 10;
      })
    )
      throw new Error('Parent relationship can hold upto 10 entries.');

    return JSON.parse(
      JSON.stringify(
        instanceToPlain(this, {
          exposeUnsetFields: true,
          exposeDefaultValues: true,
        }) as Extension
      ).replace('undefined', 'null')
    );
  }

  private getFileRef(): string {
    return `/${this.collection}/${this.id}`;
  }

  getPubFileRef(): string {
    return '/userStorage/pub'.concat(this.getFileRef());
  }

  getPrvFileRef(): string {
    return '/userStorage/prv'.concat(this.getFileRef());
  }
}
