import {
  IBaseEntityModel,
  IParentReference,
} from '../../../models/EntityModel';

type WhereFilterOp =
  | '<'
  | '<='
  | '=='
  | '>='
  | '>'
  | 'array-contains'
  | 'in'
  | 'not-in'
  | 'array-contains-any'
  | '!='
  | 'asc'
  | 'desc';

export interface IWhereParam {
  key: string | 'orderBy' | 'limit';
  operator: WhereFilterOp;
  value: null | string | boolean | number | Date | string[] | string[][];
}

export interface IFile {
  name: string;
  path: string;
  size?: number;
}

export interface IStorageMetaData {
  id: string;
  public: boolean;
  parentReference: IParentReference;
}

export interface IOrderParam {
  key: string;
  direction: 'desc' | 'asc';
}

export interface IWhereParentQuery<T> {
  parentObject: T;
  params?: IWhereParam[];
  noHooks?: boolean;
}
export interface IReferenceDB {
  transformDateTo(date: Date): never | unknown;
  transformDateFrom(object: unknown): Date;

  isAdmin: boolean;

  // initBatch(): unknown
  // commitBatch(batch: unknown): Promise<void>

  get<Model extends IBaseEntityModel>(
    collectionName: string,
    id: string
  ): Promise<Model | undefined>;

  // persistBatch<Model extends IBaseEntityModel>(
  //   collectionName: string,
  //   data: Model,
  //   batch: unknown
  // ): void

  // persistBigBatch?<Model extends IBaseEntityModel>(
  //   collectionName: string,
  //   data: Model[]
  // ): Promise<void>

  persist<Model extends IBaseEntityModel>(
    collectionName: string,
    data: Model
  ): Promise<Model | undefined>;

  // persistInTransaction<Model extends IBaseEntityModel>(
  //   collectionName: string,
  //   id: string,
  //   getLatestData: (newModel: Model) => Promise<Model>
  // ): Promise<void>

  // persistInWhereTransaction?<Model extends IBaseEntityModel>(
  //   collectionName: string,
  //   params: IWhereParam[],
  //   getLatestData: (newModel?: Model) => Promise<Model | undefined>
  // ): Promise<void>

  where<Model extends IBaseEntityModel>(
    collectionName: string,
    params: IWhereParam[],
    order?: IOrderParam[]
  ): Promise<Model[]>;

  // deleteBigBatch?<Model extends IBaseEntityModel>(
  //   collectionName: string,
  //   data: Model[]
  // ): Promise<number>

  subscribe?<Model extends IBaseEntityModel>(
    collectionName: string,
    queryParams: IWhereParam[],
    callBack: (subscribe?: Error, data?: Model[]) => void
  ): () => void;

  subscribeDocument?<Model extends IBaseEntityModel>(
    collectionName: string,
    id: string,
    callBack: (subscribe?: Error, data?: Model) => void
  ): () => void;

  // listFiles?(refPath: string): Promise<IFile[]>

  // upload?(
  //   refPath: string,
  //   file: unknown,
  //   metaData: IStorageMetaData
  // ): Promise<IFile>

  // download?(refPath: string): Promise<string>
}
