import { IFileValue, IFormBuilderJSONSchema } from '../types';

export interface ICreativeProfileInitialValues {
  avatar?: IFileValue;
  firstName: string;
  lastName: string;
  country?: string;
  city?: string;
  postal?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
}

export const getSchema = (): IFormBuilderJSONSchema<{}> => {
  return {
    initialValues: {},
    id: 'creativeProfile',
    version: 1,
    steps: [
      {
        id: 'Profile',
        title: 'Profile',
        fields: [
          'avatar',
          'firstName',
          'lastName',
          'country',
          'city',
          'postal',
          'facebook',
          'twitter',
          'instagram',
          'website',
        ],
        isGrid: true,
      },
    ],

    fields: [
      {
        id: 'firstName',
        type: 'text',
        title: `First Name`,
        validationSchema: [
          ['yup.string'],
          ['yup.required', 'First Name is required.'],
        ],
        config: {
          placeholder: 'John',
        },
        responsive: {
          md: 12,
          xs: 12,
        },
      },
      {
        id: 'lastName',
        type: 'text',
        title: `Last Name`,
        validationSchema: [
          ['yup.string'],
          ['yup.required', 'Last Name is required.'],
        ],
        config: {
          placeholder: 'Doe',
        },
        responsive: {
          md: 12,
          xs: 12,
        },
      },
      {
        id: 'country',
        type: 'text',
        title: 'Country',
      },
      {
        id: 'city',
        type: 'text',
        title: 'City',
      },
      {
        id: 'postal',
        type: 'text',
        title: 'Postal',
      },
      {
        id: 'avatar',
        type: 'avatar',
        title: 'Avatar',
        config: {
          width: '200px',
          height: '200px',
          accept: 'image/*',
          noPrompt: true,
          noCaption: true,
          borderRadius: '50%',
        },
      },
      {
        id: 'facebook',
        type: 'link',
        title: 'Facebook Link',
        config: {
          placeholder: 'https://facebook.com/my-fanpage',
        },
      },
      {
        id: 'twitter',
        type: 'link',
        title: 'Twitter Link',
        config: {
          placeholder: 'https://twitter.com/my-page',
        },
      },
      {
        id: 'instagram',
        type: 'link',
        title: 'Instagram Link',
        config: {
          placeholder: 'https://instagram.com/my-fanpage',
        },
      },
      {
        id: 'website',
        type: 'link',
        title: 'Your Website',
        config: {
          placeholder: 'https://my-site.com/',
        },
      },
    ],
  };
};
