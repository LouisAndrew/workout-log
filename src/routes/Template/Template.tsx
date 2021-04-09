import React, { FC, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { User } from '@supabase/supabase-js';

import { useTemplate } from '@h/useTemplates';
import { useAuth } from '@h/useAuth';
import { WorkoutTemplate } from '@t/Workout';
import { R } from '@r/index';
import { WorkoutPage } from '@components/WorkoutPage';

const Template: FC = () => {
  const [t, setT] = useState<WorkoutTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingNew, setIsCreatingNew] = useState(true);
  const [error, setError] = useState('');

  const location = useLocation();
  const history = useHistory();
  const { getTemplate, updateTemplate } = useTemplate();
  const { user } = useAuth();

  const fetchData = async (id: string) => {
    try {
      const template = await getTemplate(id, (user as User).id);
      if (template) {
        setT(template);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const saveTemplate = async (w: WorkoutTemplate) => {
    if (t) {
      setError('');
      const saveSuccesful = await updateTemplate(w, t.templateId, (user as User).id);
      if (!saveSuccesful) {
        setError('Error while saving changes');
      } else {
        history.replace(R.DASHBOARD);
      }
    }
  };

  useEffect(() => {
    if (!location.search) {
      setIsLoading(false);
      return;
    }

    const params = location.search
      .replace(location.pathname, '')
      .substring(1)
      .split('&')
      .map((s) => s.split('='))
      .flat();

    const templateId = params[1];
    const isCreating = params[3];

    setIsCreatingNew(!!isCreating);
    fetchData(templateId);
  }, []);

  // eslint-disable-next-line no-nested-ternary
  return t ? (
    <div className="container min-h-screen flex justify-center pt-6">
      <div className="w-full">
        <h2 className="font-body font-bold pb-3 text-right">
          {isCreatingNew ? 'CREATE NEW TEMPLATE' : 'EDIT TEMPLATE'}
        </h2>
        <WorkoutPage type="TEMPLATE" defaultWorkout={t} onSave={saveTemplate} />
        {error && (
        <h4 className="text-right font-body pt-3 text-red-600">
          {error}
        </h4>
        )}
      </div>
    </div>
  ) : isLoading ? (
    <div className="loading">is loading</div>
  ) : (
    <div className="error">Oh no! error</div>
  );
};

export default Template;
