import { IFormBuilderJSONSchema, IGenericMediaObject } from '../types';

export interface ICreativeDocumentsInitialValues {
  sin: string;
  digitalPhoto?: IGenericMediaObject;
  identity?: IGenericMediaObject;
  sinPhoto?: IGenericMediaObject;
  proofOfAdress?: IGenericMediaObject;
}

export const getSchema = (): IFormBuilderJSONSchema<{}> => {
  return {
    initialValues: [],
    id: 'documents',
    version: 1,
    steps: [
      {
        id: 'Documents',
        title: 'Documents',
        fields: [
          'sin',
          'digitalPhoto',
          'identity',
          'sinPhoto',
          'proofOfAdress',
        ],
        isGrid: true,
      },
    ],
    fields: [
      {
        id: 'sin',
        type: 'password',
        title: 'SIN',
        subtitle: 'Enter you SIN',
        validationSchema: [
          ['yup.string'],
          ['yup.required', 'SIN is required.'],
        ],
        responsive: {
          md: 12,
          xs: 12,
        },
      },
      {
        id: 'digitalPhoto',
        type: 'media',
        title: 'Digital Photo',
        subtitle: 'A digital photo in a well-lit background',
        config: { disableColumns: true, ratio: [16, 9] },
        responsive: { md: 12, xs: 12 },
      },
      {
        id: 'identity',
        type: 'file',
        title: 'Proof of Identification',
        subtitle: "International passport | Driver's license | PR Card",
        config: { accept: 'application/pdf', height: 200 },
      },
      {
        id: 'sinPhoto',
        type: 'file',
        title: 'SIN Document',
        config: { accept: 'application/pdf', height: 200 },
      },
      {
        id: 'proofOfAdress',
        type: 'file',
        title: 'Proof of Address',
        subtitle: 'Paystub | Phone Bill | Bank statement',
        config: { accept: 'application/pdf', height: 200 },
      },
    ],
  };
};
