import React, { FC, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useHistory } from 'react-router-dom';

import { useAuth } from '@h/useAuth';
import { useUserData } from '@h/useUserData';
import { R } from '@r/index';
import LogItem from './LogItem';

import './styles.css';

type Props = {};

const LogsDashboard: FC<Props> = () => {
  const { user: userData } = useAuth();
  const { getUserLogs } = useUserData();
  const user = userData() as User;
  const { replace } = useHistory();

  const [logsData, setLogsData] = useState<[string, number][]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllLogs = async () => {
    const userId = user.id;
    const logs = (await getUserLogs(userId, true)) as [string, number][];
    setLogsData(
      logs.map(([id, timestamp]) => [id.replace(`${userId}-`, ''), timestamp])
    );
    setIsLoading(false);
  };

  const sortLogsData = (data: [string, number][]) =>
    [...data].sort(([, timestampA], [, timestampB]) => timestampB - timestampA);

  useEffect(() => {
    getAllLogs();
  }, []);

  if (!isLoading) {
    return (
      <div className="logs-dashboard__wrapper">
        <h3 className="logs-dashboard__heading">EXERCISE LOGS</h3>
        <div className="logs-dashboard__logs-wrapper">
          {sortLogsData(logsData).map(([id, timestamp]) => (
            <LogItem
              key={`${id}--${timestamp}`}
              templateId={id}
              timestamp={timestamp}
              onViewLog={() => {
                replace(
                  `${R.LOG}?template=${`${user.id}-${id}`}&date=${timestamp}`
                );
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return <div className="is-loading">Loading</div>;
};

export default LogsDashboard;
