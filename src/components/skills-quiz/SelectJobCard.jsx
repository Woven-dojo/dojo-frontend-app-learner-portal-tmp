import React, { useContext } from 'react';
import { Card, Form } from '@edx/paragon';
import { SkillsContext } from './SkillsContextProvider';
import { SET_KEY_VALUE } from './data/constants';
import { DROPDOWN_OPTION_IMPROVE_CURRENT_ROLE } from './constants';

const SelectJobCard = () => {
  const { dispatch, state } = useContext(SkillsContext);
  const {
    interestedJobs, selectedJob, currentJobRole, goal,
  } = state;
  const jobsCharactersCutOffLimit = 20;
  let jobSelected;
  let jobsCard;
  if (goal === DROPDOWN_OPTION_IMPROVE_CURRENT_ROLE && currentJobRole?.length > 0) {
    jobSelected = currentJobRole[0].name;
    jobsCard = currentJobRole;
  } else {
    jobSelected = selectedJob;
    jobsCard = interestedJobs;
  }
  return (
    <>
      <h4>Related jobs and skills</h4>
      <Form.Group>
        <Form.RadioSet
          name="selected-job"
          onChange={(e) => dispatch({ type: SET_KEY_VALUE, key: 'selectedJob', value: e.target.value })}
          defaultValue={jobSelected}
          isInline
          className="row"
        >

          {jobsCard?.map(job => (
            <div
              key={job.name}
              role="group"
              aria-label={job.name}
            >
              <Card className={`${selectedJob === job.name ? 'border border-dark' : null}`}>
                <Card.Body>
                  <Card.Title as="h5" className="card-title mb-1">
                    <>
                      {job.name.length > jobsCharactersCutOffLimit
                        ? `${job.name.substring(0, jobsCharactersCutOffLimit)}...` : job.name}
                    </>
                    <Form.Radio value={job.name} />
                  </Card.Title>
                  <>
                    {job.job_postings?.length > 0 && (
                      <div>
                        <p className="text-muted m-0 medium-font">
                          <span style={{ fontWeight: 500 }}>Median Salary:</span> {job.job_postings[0].median_salary}
                        </p>
                        <p className="text-muted m-0 medium-font">
                          <span style={{ fontWeight: 500 }}>Job Postings:</span> {job.job_postings[0].unique_postings}
                        </p>
                      </div>
                    )}
                  </>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Form.RadioSet>
      </Form.Group>
    </>
  );
};

export default SelectJobCard;
