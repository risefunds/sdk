import { RulesLogic } from 'json-logic-js';

export interface IFormBuilderAutoCompleteOption {
  value: IFormBuilderBaseValuePrimitiveType;
  label: string;
  displayLabel?: string | number;
}

export type IFormBuilderBaseValuePrimitiveType =
  | string
  | number
  | Date
  | boolean
  | null
  | undefined;

export type IFormBuilderBaseValueComplexType =
  | Array<IFormBuilderBaseValuePrimitiveType>
  | File
  | Object
  | Record<string, IFormBuilderBaseValuePrimitiveType>;

export type IFormBuilderBaseValueType = IFormBuilderBaseValuePrimitiveType &
  IFormBuilderBaseValueComplexType;

export type IFormBuilderInitialValueType = {
  [key: string]:
    | IFormBuilderBaseValuePrimitiveType
    | IFormBuilderBaseValueComplexType;
};

export interface IFormBuilderJSONFieldResponsive {
  xs?: number;
  md?: number;
}
export interface IFormBuilderJSONFieldType {
  id: string;
  type: string;
  title: string;
  config?: Record<string, any>;
  fields?: IFormBuilderJSONFieldType[];
  skip?: RulesLogic;
  validationSchema?: any[];
  subtitle?: string;
  multiple?: boolean;
  defaultValue?: any;
  responsive?: IFormBuilderJSONFieldResponsive;
}

export interface IFormBuilderJSONStepType {
  id: string;
  title: string;
  fields?: string[];
  skip?: RulesLogic;
  subtitle?: string;
  disableGutters?: boolean;
  isGrid?: boolean;

  footerSubmitTitle?: string;
  footerSubmitButtonFullWidth?: boolean;
}

export interface IFormBuilderJSONSchema<
  IValues extends IFormBuilderInitialValueType,
> {
  id: string;
  steps: IFormBuilderJSONStepType[];
  initialValues: IValues;
  fields: IFormBuilderJSONFieldType[];
  version: number;
}

export interface IFileValue {
  url: string;
  name: string;
}

export interface IGenericColumnImageUploadFileObject {
  id: string;
  url?: string;
  name?: string;
  caption?: string;
  storageRef?: string;
  local?: string;
  width?: number;
  height?: number;
  bucket?: string;
  bytes?: number;
}
export interface IGenericSingleImageUploadValue
  extends IGenericColumnImageUploadFileObject {}

export type IGenericMediaType = 'gallery' | 'youtubeEmbed';
export interface IGenericMediaObject {
  type: IGenericMediaType;
  files: IGenericSingleImageUploadValue[];
}
