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
import { BiPlus } from 'react-icons/bi';
import { Button } from '@/components/Button';

type TemplateDashboard = WorkoutTemplate & {
  logCount: number;
  lastWorkout: number;
};

const TemplatesDashboard: FC = () => {
  const { replace } = useHistory();
  const { getUserTemplate, getLogsDataDashboard } = useUserData();
  const { user: authUser } = useAuth();
  const { getMultipleTemplates, createTemplate } = useTemplate();
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
    if (date) {
      const route = `${
        R.LOG
      }?template=${tableTemplateId}&date=${date.getTime()}&state=create`;
      replace(route);
    }
  };

  const handleCreateTemplate = async () => {
    const { id } = user;
    const route = await createTemplate(id);
    replace(route);
  };

  const viewTemplate = (templateId: string) => {
    replace(`${R.TEMPLATE}?id=${user.id}-${templateId}`);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div className="templates-dashboard__wrapper">
      <h3 className="templates-dashboard__heading">
        TEMPLATES
        <Button
          size="s"
          Icon={BiPlus}
          onClick={handleCreateTemplate}
          className="templates-dashboard__create-new"
        >
          ADD NEW TEMPLATE
        </Button>
      </h3>
      {!isLoading ? (
        <div className="templates-dashboard__template-wrapper">
          {templateData.map((template) => (
            <TemplateCard
              key={template.templateId}
              template={template}
              timesDone={template.logCount}
              lastWorkout={
                template.lastWorkout !== 0
                  ? new Date(template.lastWorkout)
                  : undefined
              }
              useTemplate={() => {
                create(template.templateId);
              }}
              viewTemplate={() => viewTemplate(template.templateId)}
              className="mr-3 flex-shrink-0"
            />
          ))}
        </div>
      ) : (
        <div className="is-loading">Loading</div>
      )}
    </div>
  );
};

export default TemplatesDashboard;
