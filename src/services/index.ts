import { IEntityModelExtension, IBaseEntityModel } from '../models/EntityModel';
import { BaseService, baseServiceContainer } from './base';
import {
  CoreService,
  coreServiceContainer,
  IEntityExtensionService,
} from './core';

export * from './base';
export * from './core';

export interface ISDKServices {
  core: CoreService;
  base: BaseService;
  events: {
    ard: IEntityExtensionService<
      unknown & IEntityModelExtension,
      unknown & IBaseEntityModel
    >[];
    crud: IEntityExtensionService<
      unknown & IEntityModelExtension,
      unknown & IBaseEntityModel
    >[];
  };
}

export const getSDKServices = (): ISDKServices => {
  return {
    base: baseServiceContainer.resolve<BaseService>(BaseService),
    core: coreServiceContainer.resolve<CoreService>(CoreService),
    events: {
      crud: coreServiceContainer.getAll<
        IEntityExtensionService<
          unknown & IEntityModelExtension,
          unknown & IBaseEntityModel
        >
      >('entity'),
      ard: coreServiceContainer
        .getAll<
          IEntityExtensionService<
            unknown & IEntityModelExtension,
            unknown & IBaseEntityModel
          >
        >('entity')
        .filter((v) => {
          return v.ardParents.length > 0;
        }),
    },
  };
};
