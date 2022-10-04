const steps = [
  {
    selector: '.tour-kickoff-survey',
    content: () => (
      <p className="reactour-step reactour-step-kickoff-survey">
        To have access to courses within your interests, please first complete Kick-Off questionaire
      </p>
    ),
    position: 'left',
    padding: {
      mask: 10,
    },
    resizeObservables: ['.tour-kickoff-survey'],
  },
  {
    selector: '.tour-learning-path-top-position',
    content: () => (
      <p className="reactour-step reactour-step-learning-path">
        Here is the area that consist of courses that are pre-selected for you learning path. All of those courses are
        available for you to start right away
      </p>
    ),
    position: 'top',
    highlightedSelectors: ['.tour-learning-path'],
    resizeObservables: ['.tour-learning-path'],
  },
  {
    selector: '.tour-course-catalog-top-position',
    content: () => (
      <p className="reactour-step reactour-step-course-catalog">
        Here you can find any courses you might be interested in. Just use the filter and find the right course for you
      </p>
    ),
    position: 'top',
    highlightedSelectors: ['.tour-course-catalog'],
    resizeObservables: ['.tour-course-catalog'],
  },
];

export default steps;
