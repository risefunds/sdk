import { inject, injectable } from 'inversify';
import {
  IWhereParam,
  IFile,
  IOrderParam,
} from '../base/ReferenceService/IReferenceDB';

import {
  IEntityModelExtension,
  IBaseEntityModel,
} from '../../models/EntityModel';
import { BaseService } from '../base/BaseService';

export interface ITriggerOptions {
  timeoutSeconds?: number;
  memory?: string;
  failurePolicy?: boolean;
  minInstances?: number;
  maxInstances?: number;
}

export interface IEntityService {
  collection: string;
  ardParents: string[];
  triggerOptions: ITriggerOptions;
}

export interface IUploadResponse {
  id: string;
  file: IFile;
}

export interface IEntityExtensionService<
  ClassObject extends IEntityModelExtension,
  JSONModel extends IBaseEntityModel,
> extends IEntityService {
  serviceName: string;
  onCreate?(json: ClassObject): Promise<ClassObject>;
  onUpdate?(before: ClassObject, after: ClassObject): Promise<ClassObject>;
  parser(json: JSONModel): Promise<ClassObject>;
}

interface ITransformerFromOptions {
  noHooks?: boolean;
}
@injectable()
export class EntityService<
  ClassObject extends IEntityModelExtension,
  JSONModel extends IBaseEntityModel,
> implements IEntityService
{
  triggerOptions: ITriggerOptions = {
    failurePolicy: true,
    timeoutSeconds: 60,
  };
  @inject('base')
  protected baseService!: BaseService;
  public collection!: string;
  private transformers!: {
    from: (
      json: JSONModel,
      options: ITransformerFromOptions
    ) => Promise<ClassObject>;
    to?: (classObject: ClassObject) => JSONModel;
  };
  public ardParents: string[] = [];
  private parentCollection: string[] = [];

  init(
    collection: string,
    parentCollection: string[],
    transformers: {
      from: (
        json: JSONModel,
        options: ITransformerFromOptions
      ) => Promise<ClassObject>;
      to?: (classObject: ClassObject) => JSONModel;
    },
    ardParents: string[] = []
  ): void {
    if (!ardParents.every((ardp) => parentCollection.includes(ardp)))
      throw new Error("ARD Parents doesn't match entity parents");
    this.collection = collection;
    this.transformers = transformers;
    this.ardParents = ardParents;
    this.parentCollection = parentCollection;
  }

  async transformerFrom(
    json: JSONModel,
    options: ITransformerFromOptions
  ): Promise<ClassObject> {
    if (!this.transformers.from) throw new Error('Transformer not defined');
    return this.transformers.from(
      {
        ...json,
        createdAt: this.baseService.referenceService.db?.transformDateFrom(
          json.createdAt
        ),
        updatedAt: this.baseService.referenceService.db?.transformDateFrom(
          json.updatedAt
        ),
      },
      options
    );
  }

  transformerTo(classObject: ClassObject): JSONModel {
    console.log('transformerTo', classObject);
    return {
      ...((this.transformers.to
        ? this.transformers.to(classObject)
        : classObject.toJSON()) as Record<string, unknown>),
      createdAt: this.baseService.referenceService.db?.transformDateTo(
        classObject.createdAt
      ),
      updatedAt: this.baseService.referenceService.db?.transformDateTo(
        classObject.updatedAt
      ),
    } as JSONModel;
  }

  async persist(
    classObject: ClassObject,
    options: ITransformerFromOptions = {}
  ): Promise<ClassObject> {
    const response =
      await this.baseService.referenceService.db?.persist<JSONModel>(
        this.collection,
        this.transformerTo(classObject)
      );
    if (!response) throw new Error('Persist failed');
    return this.transformerFrom(response, options);
  }

  async get(
    id: string,
    options: ITransformerFromOptions = {}
  ): Promise<ClassObject | undefined> {
    const response = await this.baseService.referenceService.db?.get<JSONModel>(
      this.collection,
      id
    );

    return response ? this.transformerFrom(response, options) : undefined;
  }

  async getFromChild<ChildClassObject extends IEntityModelExtension>(
    child: ChildClassObject
  ): Promise<ClassObject | undefined> {
    if (!child.parentCollection.includes(this.collection))
      throw new Error(
        `${this.collection} isn't referered ${child.collection} - ${child.id}`
      );
    const parentId = child.getSingleParentReference(this.collection);
    if (!parentId)
      throw new Error(
        `${this.collection} isn't referered ${child.collection} - ${child.id}`
      );

    return this.get(parentId);
  }

  parser(
    json: JSONModel,
    options: ITransformerFromOptions = {}
  ): Promise<ClassObject> {
    return this.transformerFrom(json, options);
  }

  async subscribe(
    {
      options = {},
      ...query
    }: {
      params: IWhereParam[];
      options?: ITransformerFromOptions;
    },
    callback: (error?: Error, data?: Promise<ClassObject[]>) => void
  ): Promise<() => void> {
    if (!this.baseService.referenceService.db?.subscribe)
      throw new Error('Subscription not supported');
    return this.baseService.referenceService.db?.subscribe<JSONModel>(
      this.collection,
      query.params,
      (error, data) => {
        if (error) callback(error, undefined);
        if (data)
          callback(
            undefined,
            Promise.all(data.map((d) => this.transformerFrom(d, options)))
          );
      }
    );
  }

  async subscribeDocument(
    {
      options = {},
      ...query
    }: {
      id: string;
      options?: ITransformerFromOptions;
    },
    callback: (error?: Error, data?: Promise<ClassObject>) => void
  ): Promise<() => void> {
    if (!this.baseService.referenceService.db?.subscribeDocument)
      throw new Error('Subscription not supported');
    return this.baseService.referenceService.db?.subscribeDocument<JSONModel>(
      this.collection,
      query.id,
      (error, data) => {
        if (error) callback(error, undefined);
        if (data) callback(undefined, this.transformerFrom(data, options));
      }
    );
  }

  async where({
    options = {},
    ...query
  }: {
    params: IWhereParam[];
    order?: IOrderParam[];
    options?: ITransformerFromOptions;
  }): Promise<ClassObject[]> {
    if (!this.baseService.referenceService.db?.where)
      throw new Error('where not supported');
    console.log({ query: query.params });

    const responses =
      await this.baseService.referenceService.db?.where<JSONModel>(
        this.collection,
        query.params,
        query.order
      );

    return Promise.all(
      responses.map(async (r) => {
        return this.transformerFrom(r, options);
      })
    );
  }

  async whereViaParent<ParentClassObject extends IEntityModelExtension>(query: {
    parentObject: ParentClassObject;
    params?: IWhereParam[];
    order?: IOrderParam[];
  }): Promise<ClassObject[]> {
    if (!this.parentCollection.includes(query.parentObject.collection))
      throw new Error('No Parent Reference');
    const params: IWhereParam[] = [
      {
        key: query.parentObject.relationshipKeyInChild,
        operator: '==',
        value: query.parentObject.id,
      },
      ...(query.params || []),
    ];
    return this.where({ params, order: query.order || [] });
  }
}
