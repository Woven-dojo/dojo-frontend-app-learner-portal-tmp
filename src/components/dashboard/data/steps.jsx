const steps = [
  {
    selector: '.step-1',
    content: () => (
      <p className="reactour-step reactour-step-1">To have access to courses within your interests, please first complete Kick-Off questionaire</p>
    ),
    position: 'left',
    padding: {
      mask: 10,
    },
    resizeObservables: ['.step-1'],
  },
  {
    selector: '.step-2-top-position',
    content: () => (
      <p className="reactour-step reactour-step-2">Here is the area that consist of courses that are pre-selected for you learning path. All of those courses are available for you to start right away</p>
    ),
    position: 'top',
    highlightedSelectors: ['.step-2'],
    resizeObservables: ['.step-2'],
  },
  {
    selector: '.step-3-top-position',
    content: () => (
      <p className="reactour-step reactour-step-3">Here you can find any courses you might be interested in. Just use the filter and find the right course for you</p>
    ),
    position: 'top',
    highlightedSelectors: ['.step-3'],
    resizeObservables: ['.step-3'],
  },
];

export default steps;
