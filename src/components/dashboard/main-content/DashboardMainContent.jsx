import React, { useContext } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { breakpoints, MediaQuery } from '@edx/paragon';

import { CourseEnrollments } from './course-enrollments';

import SupportInformation from '../sidebar/SupportInformation';

const DashboardMainContent = () => {
  const {
    enterpriseConfig: { name },
    authenticatedUser,
  } = useContext(AppContext);

  const userFirstName = authenticatedUser?.name.split(' ').shift();

  return (
    <>
      <h2 className="h1 mb-4">{userFirstName ? `Welcome, ${userFirstName}!` : 'Welcome!'}</h2>
      <CourseEnrollments>
        {/* The children below will only be rendered if there are no course enrollments. */}
        <p>
          You are not enrolled in any courses sponsored by {name}. Reach out to your administrator for instructions on
          how to start learning learning with edX!
        </p>
      </CourseEnrollments>

      <MediaQuery maxWidth={breakpoints.medium.maxWidth}>
        {(matches) => (matches ? <SupportInformation className="mt-5" /> : null)}
      </MediaQuery>
    </>
  );
};

export default DashboardMainContent;
