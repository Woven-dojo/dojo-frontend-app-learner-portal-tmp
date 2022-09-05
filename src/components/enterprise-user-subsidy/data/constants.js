// eslint-disable-next-line import/prefer-default-export

export const LOADING_SCREEN_READER_TEXT = 'loading your edX benefits from your organization';

export const filterInitial = {
  learningPaths: [],
  languages: [],
  difficultyLevels: [],
  deliveryMethods: [],
};

export const filterGroups = [
  { id: 'learningPaths', label: 'Learning path' },
  { id: 'languages', label: 'Language' },
  { id: 'difficultyLevels', label: 'Difficulty level' },
  { id: 'deliveryMethods', label: 'Delivery methods' },
];

/**
 * As we want to group skills like "Data Science 1" and "Data Science 2" into one group for the
 * end user, we need to have some mapping. We should discuss moving this solution to the backend
 * so it becomes easier to maintain (e.g. by adding skill_group field).
 */
export const filterOptionsExpanded = {
  learningPaths: {
    1: ['1'],
    2: ['2'],
    3: ['3', '10', '11', '12', '13'],
    4: ['4'],
    5: ['5'],
    6: ['6', '14'],
    7: ['7'],
    8: ['8'],
    9: ['9'],
  },
};

export const filterOptions = {
  learningPaths: [
    { value: '1', label: 'Product Management' },
    { value: '2', label: 'Software Development' },
    { value: '3', label: 'Data Science' },
    { value: '4', label: 'QA/QC Engineering' },
    { value: '5', label: 'Industrial Engineering' },
    { value: '6', label: 'Machine Learning' },
    { value: '7', label: 'Systems Engineering' },
    { value: '8', label: 'Software Architecture' },
    { value: '9', label: 'Test Engineering' },
  ],
  languages: [
    {
      value: 'en',
      label: 'EN',
    },
    {
      value: 'jp',
      label: '日本',
    },
  ],
  difficultyLevels: [
    {
      value: 'Basic',
      label: 'Basic',
    },
    {
      value: 'Intermediate',
      label: 'Intermediate',
    },
    {
      value: 'Advanced',
      label: 'Advanced',
    },
  ],
  deliveryMethods: [
    {
      value: 'self_paced',
      label: 'Self paced',
    },
    {
      value: 'face_to_face',
      label: 'Face to face',
    },
    {
      value: 'individual_lessons',
      label: 'Individual lessons',
    },
  ],
};
