import React, { FC, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { useAuth } from '@h/useAuth';
import { useExerciseLogs } from '@h/useExerciseLogs';
import { Button } from '@components/Button';
import { R } from '@r/index';
import { useHistory } from 'react-router-dom';

type Props = {}

const LogsDashboard: FC<Props> = () => {
  const { user: userData } = useAuth();
  const { createLogs, getAllExerciseLog } = useExerciseLogs();
  const user = userData() as User;
  const { replace } = useHistory();

  // push-workout-ad
  const templateId = 'push-workout-ad';

  const create = async () => {
    const tableTemplateId = `${user.id}-${templateId}`;
    const date = await createLogs(tableTemplateId, user.id);
    console.log({ date });
    if (date) {
      const route = `${R.LOG}?template=${tableTemplateId}&date=${date.getTime()}&createNew=true`;
      replace(route);
    }
  };

  const getAll = async () => {
    console.log(await getAllExerciseLog(user.id));
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Button onClick={create}>create log!</Button>
  );
};

export default LogsDashboard;
