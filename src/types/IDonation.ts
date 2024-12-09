import { IFormBuilderInitialValueType } from './IFormbuilder';

export interface IDonationInitialValues extends IFormBuilderInitialValueType {
  campaignId: string;
  amount: number;
  applicationLink: string;
  email: string;
  displayName: string;
}
