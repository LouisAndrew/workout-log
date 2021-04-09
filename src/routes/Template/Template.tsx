import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { User } from '@supabase/supabase-js';

import { useTemplate } from '@h/useTemplates';
import { useAuth } from '@h/useAuth';
import { WorkoutTemplate } from '@t/Workout';
import { WorkoutPage } from '@components/WorkoutPage';

const Template: FC = () => {
  const [t, setT] = useState<WorkoutTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingNew, setIsCreatingNew] = useState(true);

  const location = useLocation();
  const { getTemplate } = useTemplate();
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

  useEffect(() => {
    if (!location.search) {
      console.log(location.search);
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

    console.log({ isCreating, templateId });

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
        <WorkoutPage type="TEMPLATE" defaultWorkout={t} />
      </div>
    </div>
  ) : isLoading ? (
    <div className="loading">is loading</div>
  ) : (
    <div className="error">Oh no! error</div>
  );
};

export default Template;
