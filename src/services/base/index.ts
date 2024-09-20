import { Container } from 'inversify';
import { BackendService } from './BackendService';
import { BaseService } from './BaseService';

import { ReferenceService } from './ReferenceService/ReferenceService';

export * from './ReferenceService/IReferenceDB';

const baseServiceContainer = new Container();

baseServiceContainer
  .bind<ReferenceService>(ReferenceService)
  .toSelf()
  .inSingletonScope();
baseServiceContainer
  .bind<BackendService>(BackendService)
  .toSelf()
  .inSingletonScope();

baseServiceContainer.bind<BaseService>(BaseService).toSelf().inSingletonScope();

export { baseServiceContainer, BaseService };
