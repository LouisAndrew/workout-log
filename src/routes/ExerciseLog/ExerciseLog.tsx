import React, { FC, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { User } from '@supabase/supabase-js';

import { useExerciseLogs } from '@h/useExerciseLogs';
import { useTemplate } from '@h/useTemplates';
import { useAuth } from '@h/useAuth';
import { useUserData } from '@h/useUserData';
import { Workout, WorkoutTemplate } from '@t/Workout';
import { WorkoutPage } from '@components/WorkoutPage';
import { R } from '@r/index';
import { ColorData } from '@/types/ColorData';

const ExerciseLog: FC = () => {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogAllowed, setIsLogAllowed] = useState(false);
  const [err, setErr] = useState('');
  const [colorData, setColorData] = useState<ColorData[]>([]);

  const { search } = useLocation();
  const history = useHistory();
  const { getLogs, saveLogs } = useExerciseLogs();
  const { getTemplate } = useTemplate();
  const { getUserLogsByTemplate, getUserBands } = useUserData();
  const { user: authUser } = useAuth();
  const user = authUser() as User;
  const [comparisonWorkouts, setComparisonWorkouts] = useState<Workout[]>([]);

  const extractDataFromUrl = async () => {
    try {
      const [templateId, date, createNew] = search
        .substr(1)
        .split('&')
        .map((str) => str.split('=')[1]);
      const exercises = await getLogs(templateId, parseInt(date, 10));
      const t = await getTemplate(templateId, user.id);

      if (exercises && t) {
        const allowLog = !!createNew;
        setIsLogAllowed(allowLog);
        const { name, templateId: workoutTemplateId } = t;
        const wt: Workout = {
          name,
          exercises: exercises.map((e) => {
            const index = t.exercises.findIndex((ex) => ex.id === e.id);
            return {
              ...e,
              order:
                index !== -1 ? t.exercises[index].order : exercises.length - 1,
            };
          }),
          templateId: workoutTemplateId,
          date: new Date(parseInt(date, 10)),
          color: t.color,
        };

        const bands = await getUserBands(user.id);
        setColorData(bands);
        setWorkout(wt);
        if (allowLog) {
          await getAllWorkouts(templateId, t);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getAllWorkouts = async (templateId: string, t: WorkoutTemplate) => {
    const res = await getUserLogsByTemplate(templateId, user.id);
    const promises = await Promise.all(
      res.map(async (result) => {
        const log = await getLogs(result[0], result[1]);
        return {
          ...t,
          date: new Date(result[1]),
          exercises: log || [],
        };
      })
    );
    setComparisonWorkouts(
      promises.filter((p) => p.date.getTime() !== workout?.date.getTime()) || []
    );
  };

  const handleSave = async (
    w: Workout | WorkoutTemplate,
    isTemplateChanged: boolean
  ) => {
    const res = await saveLogs(w as Workout, isTemplateChanged, user.id);
    if (res) {
      history.replace(R.DASHBOARD);
    }

    setErr('Error while saving the logs');
  };

  useEffect(() => {
    extractDataFromUrl();
  }, []);

  if (workout) {
    return (
      <div className="page">
        <div className="w-full">
          <h2 className="font-body font-bold pb-3 text-right">
            {isLogAllowed ? 'CREATE NEW EXERCISE LOG' : 'VIEW EXERCISE LOG'}
          </h2>
          <WorkoutPage
            type="LOG"
            defaultWorkout={workout}
            isLoggable={isLogAllowed}
            isEditable={false}
            saveLog={handleSave}
            comparisonWorkouts={comparisonWorkouts}
          />
          {err && (
            <div className="error-msg font-body font-medium text-red-500">
              {err}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div className="is-loading">Is loading</div>;
  }

  return <div className="error">error</div>;
};

export default ExerciseLog;
