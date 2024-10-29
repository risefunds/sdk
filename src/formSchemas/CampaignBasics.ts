import {
  IFormBuilderAutoCompleteOption,
  IFormBuilderJSONSchema,
  IGenericMediaObject,
} from '../types';

export interface ICampaignBasicsInitialValues {
  campaignTitle: string;
  campaignTagline?: string;
  campaignCard?: IGenericMediaObject;
  campaignLocation?: string;
  campaignCategory?: IFormBuilderAutoCompleteOption;
  campaignTags?: IFormBuilderAutoCompleteOption[];
  campaignDuration: number;
}

export const campaignBasicsInitialValues: ICampaignBasicsInitialValues = {
  campaignTitle: 'My Campaign Title',
  campaignDuration: 60,
};

export const getSchema = (): IFormBuilderJSONSchema<{}> => {
  return {
    initialValues: campaignBasicsInitialValues,
    id: 'basics',
    version: 1,
    steps: [
      {
        id: 'Basics',
        title: 'Basics',
        fields: [
          'campaignTitle',
          'campaignTagline',
          'campaignCard',
          'campaignLocation',
          'campaignCategory',
          'campaignTags',
          'campaignDuration',
        ],
        isGrid: true,
      },
    ],

    fields: [
      {
        id: 'campaignTitle',
        type: 'text',
        title: 'Campaign Title',
        subtitle: 'What is the title of your campaign?',
        validationSchema: [
          ['yup.string'],
          ['yup.required', 'Campaign Title is required.'],
        ],
        responsive: {
          md: 12,
          xs: 12,
        },
      },
      {
        id: 'campaignTagline',
        type: 'text',
        title: 'Campaign Tagline',
        subtitle: 'What is the title of your campaign?',
        validationSchema: [
          ['yup.string'],
          ['yup.required', 'Campaign Tagline is required.'],
        ],
        config: {
          multiline: true,
          rows: 3,
        },
      },
      {
        id: 'campaignCard',
        type: 'media',
        title: 'Campaign Card Image',
        subtitle: 'Upload an image that represents your campaign.',
        config: { disableColumns: true, ratio: [16, 9] },
        responsive: { md: 12, xs: 12 },
      },
      {
        id: 'campaignLocation',
        type: 'text',
        title: 'Campaign Location',
        subtitle:
          'Choose the location where you are running the campaign. This location will be visible on your campaign page for your audience to see.',
        config: {
          placeholder: 'Country',
        },
        validationSchema: [
          ['yup.string'],
          ['yup.required', 'Campaign Location is required.'],
        ],
      },
      {
        id: 'campaignCategory',
        type: 'autocomplete',
        title: 'Category',
        subtitle:
          'To help backers find your campaign, select a category that best represents your project.',
        responsive: {
          md: 12,
          xs: 12,
        },
        config: {
          placeholder: 'Category',
          options: [
            {
              label: 'Audio',
              value: 'Audio',
            },
            {
              label: 'Camera Gear',
              value: 'Camera Gear',
            },
            {
              label: 'Education',
              value: 'Education',
            },
            {
              label: 'Energy & Green Tech',
              value: 'Energy & Green Tech',
            },
            {
              label: 'Fashion & Wearables',
              value: 'Fashion & Wearables',
            },
          ],
        },
        validationSchema: [
          ['yup.object'],
          ['yup.required'],
          [
            'yup.shape',
            {
              value: [
                ['yup.string'],
                ['yup.required', 'Atleast one professional title is required'],
              ],
            },
          ],
        ],
      },
      {
        id: 'campaignTags',
        type: 'autocomplete',
        title: 'Tags',
        subtitle:
          'Enter up to five keywords that best describe your campaign. These tags will help with organization and discoverability.',
        responsive: {
          md: 12,
          xs: 12,
        },
        config: {
          placeholder: 'Enter a few tags for your campaign',
          options: [
            {
              label: 'adventure',
              value: 'adventure',
            },
            {
              label: '3d',
              value: '3d',
            },
            {
              label: 'arduino',
              value: 'arduino',
            },
            {
              label: 'animation',
              value: 'animation',
            },
            {
              label: 'album',
              value: 'album',
            },
          ],
          addMore: true,
          multiple: true,
        },
        validationSchema: [
          ['yup.array'],
          ['yup.required', 'At least one campaign tag is required'],
          ['yup.min', 1],
          [
            'yup.of',
            [
              ['yup.object'],
              ['yup.required'],
              [
                'yup.shape',
                {
                  value: [
                    ['yup.string'],
                    ['yup.required', 'At least one campaign tag is required'],
                  ],
                },
              ],
            ],
          ],
        ],
      },
      {
        id: 'campaignDuration',
        type: 'text',
        title: 'Campaign Duration',
        subtitle: 'Maximum duration for a campaign is 60 days',
        validationSchema: [
          ['yup.number'],
          ['yup.required', 'Campaign Duration is required.'],
          ['yup.max', 60],
        ],
      },
    ],
  };
};
