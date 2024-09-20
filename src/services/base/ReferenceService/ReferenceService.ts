import { injectable } from 'inversify';
import { IReferenceDB } from './IReferenceDB';

@injectable()
export class ReferenceService {
  db: IReferenceDB | undefined;
}
