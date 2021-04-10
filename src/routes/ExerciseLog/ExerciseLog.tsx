import React, { FC, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { User } from '@supabase/supabase-js';

import { useExerciseLogs } from '@h/useExerciseLogs';
import { useTemplate } from '@h/useTemplates';
import { useAuth } from '@h/useAuth';
import { Workout, WorkoutTemplate } from '@t/Workout';
import { WorkoutPage } from '@components/WorkoutPage';
import { R } from '@r/index';

// /log?template=4612188d-fbb3-40a4-84ed-a130a1004698-push-workout-ad&date=1618079569982
const ExerciseLog: FC = () => {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogAllowed, setIsLogAllowed] = useState(false);
  const [err, setErr] = useState('');

  const { search } = useLocation();
  const history = useHistory();
  const { getLogs, saveLogs } = useExerciseLogs();
  const { getTemplate } = useTemplate();
  const { user } = useAuth();

  const extractDataFromUrl = async () => {
    try {
      const [templateId, date, createNew] = search.substr(1).split('&').map((str) => str.split('=')[1]);
      const exercises = await getLogs(templateId, parseInt(date, 10));
      const t = await getTemplate(templateId, (user() as User).id);

      console.log({ exercises });

      if (exercises && t) {
        setIsLogAllowed(!!createNew);
        const { name, templateId: workoutTemplateId } = t;
        const wt: Workout = {
          name,
          exercises: exercises.map((e) => {
            const index = t.exercises.findIndex((ex) => ex.id === e.id);
            return {
              ...e,
              order: index !== -1 ? t.exercises[index].order : exercises.length - 1
            };
          }),
          templateId: workoutTemplateId,
          date: new Date(parseInt(date, 10)),
        };

        setWorkout(wt);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (w: Workout | WorkoutTemplate, isTemplateChanged: boolean) => {
    const res = await saveLogs(w as Workout, isTemplateChanged, (user() as User).id);
    if (res) {
      history.replace(R.DASHBOARD);
    }

    setErr('Error while saving the logs');
  };

  useEffect(() => {
    extractDataFromUrl();
  }, []);

  console.log(workout);

  if (workout) {
    return (
      <div className="container min-h-screen flex justify-center py-6">
        <div className="w-full">
          <h2 className="font-body font-bold pb-3 text-right">
            {isLogAllowed ? 'CREATE NEW EXERCISE LOG' : 'VIEW EXERCISE LOG'}
          </h2>
          <WorkoutPage type="LOG" defaultWorkout={workout} isLoggable={isLogAllowed} isEditable={false} saveLog={handleSave} />
          {err && (
            <div className="error-msg">
              {err}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="is-loading">
        Is loading
      </div>
    );
  }

  return <div className="error">error</div>;
};

export default ExerciseLog;
