import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

const DEBUG_EMAIL = 'john.doe@email.mock';

const VerifyEmail: FC = () => {
  const { state } = useLocation();
  const email = (state as any)?.email || DEBUG_EMAIL;
  // location.state

  return (
    <div className="container h-screen flex items-center justify-center">
      <div className="w-max">
        <h2 className="heading heading--2">
          Thank you for signing up!
        </h2>
        <p className="font-body text-base mt-3">
          We&apos;ve sent a confirmation email to
          {' '}
          {email}
          {'. '}
          Please click the link on the mail to verify your email.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
