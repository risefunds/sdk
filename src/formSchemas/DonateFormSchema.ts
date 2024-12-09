// import { v4 } from 'uuid';
import { IFormBuilderJSONSchema, IDonationInitialValues } from '../types';

export const donateInitialValues: IDonationInitialValues = {
  amount: 100,
  email: '',
  displayName: '',
  applicationLink: '',
  campaignId: '',
};

export const getSchema = (): IFormBuilderJSONSchema<IDonationInitialValues> => {
  return {
    initialValues: {
      ...donateInitialValues,
    },
    version: 1,
    id: 'donationFormSchema',
    steps: [
      {
        id: 'Donation',
        title: 'Back Campaign',
        fields: ['displayName', 'email', 'amount'],
        isGrid: true,
      },
    ],
    fields: [
      {
        id: 'displayName',
        type: 'text',
        title: 'Display Name',
        validationSchema: [
          ['yup.string'],
          ['yup.required', 'Display Name is required.'],
        ],
        responsive: {
          md: 6,
          xs: 12,
        },
      },
      {
        id: 'email',
        type: 'email',
        title: `Email Address`,
        validationSchema: [
          ['yup.string'],
          ['yup.email', 'Enter a valid email address.'],
          ['yup.required', 'Email is required.'],
        ],
        config: {
          placeholder: 'johndoe@abc.com',
        },
      },
      {
        id: 'amount',
        type: 'number',
        title: `Amount`,
        validationSchema: [
          ['yup.number'],
          ['yup.required', 'Amount is required.'],
        ],
      },
    ],
  };
};
