import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from '@supabase/supabase-js';

import { useAuth } from '@h/useAuth';
import { useUserData } from '@h/useUserData';
import { useTemplate } from '@h/useTemplates';
import { WorkoutTemplate } from '@t/Workout';
import { useExerciseLogs } from '@h/useExerciseLogs';
import { R } from '@r/index';
import { TemplateCard } from '@components/Cards/TemplateCard';

import './styles.css';

type TemplateDashboard = WorkoutTemplate & {
  logCount: number;
  lastWorkout: number;
};

const TemplatesDashboard: FC = () => {
  const { replace } = useHistory();
  const { getUserTemplate, getLogsDataDashboard } = useUserData();
  const { user: authUser } = useAuth();
  const { getMultipleTemplates } = useTemplate();
  const { createLogs } = useExerciseLogs();
  const user = authUser() as User;

  const [isLoading, setIsLoading] = useState(true);
  const [templateData, setTemplateData] = useState<TemplateDashboard[]>([]);

  const fetchTemplates = async () => {
    try {
      const uid = user.id;
      const templates = await getUserTemplate(uid);
      if (templates) {
        const req = await getMultipleTemplates(templates, uid);
        const templatesModified = await Promise.all(
          req.map(async (s) => {
            const logsDataDashboard = await getLogsDataDashboard(
              uid,
              s.templateId
            );
            return {
              ...s,
              ...logsDataDashboard,
            };
          })
        );

        setTemplateData(templatesModified);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const create = async (templateId: string) => {
    const tableTemplateId = `${user.id}-${templateId}`;
    const date = await createLogs(tableTemplateId, user.id);
    console.log('a');
    if (date) {
      const route = `${
        R.LOG
      }?template=${tableTemplateId}&date=${date.getTime()}&createNew=true`;
      replace(route);
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  if (!isLoading) {
    return (
      <div className="templates-dashboard__wrapper">
        {templateData.map((template) => (
          <TemplateCard
            key={template.templateId}
            template={template}
            timesDone={template.logCount}
            lastWorkout={template.lastWorkout !== 0 ? new Date(template.lastWorkout) : undefined}
            useTemplate={() => {
              create(template.templateId);
            }}
            className="ml-3 first:ml-0"
          />
        ))}
      </div>
    );
  }

  return <div className="is-loading">Loading</div>;
};

export default TemplatesDashboard;