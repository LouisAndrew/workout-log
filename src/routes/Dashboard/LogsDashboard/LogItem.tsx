import React, { FC, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

import { useTemplate } from '@h/useTemplates';
import { useAuth } from '@h/useAuth';
import { getReadableDate } from '@helper/date';

export type Props = {
  /**
   * id of the template
   */
  templateId: string;
  /**
   * timestamp of the log
   */
  timestamp: number;
  /**
   * additional styling
   */
  className?: string;
  onViewLog?: () => void;
};

const LogItem: FC<Props> = ({
  templateId,
  timestamp,
  className,
  onViewLog,
}) => {
  const { getTemplateName } = useTemplate();
  const { user: userAuth } = useAuth();

  const user = userAuth() as User;

  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);

  const getNameFromDb = async () => {
    const res = await getTemplateName(`${user.id}-${templateId}`);
    if (!res || res.error) {
      setErr(true);
      return;
    }

    setName(res.data[0].name);
    setIsLoading(false);
  };

  useEffect(() => {
    getNameFromDb();
  }, []);

  if (err) {
    return <div className="">err</div>;
  }

  if (isLoading) {
    return <div>is loading</div>;
  }

  return (
    <button
      type="button"
      className={`log-item__wrapper ${className}`}
      onClick={onViewLog}
    >
      {name}
      <span className="date font-body tracking-wide">
        {getReadableDate(new Date(timestamp))}
      </span>
    </button>
  );
};
export default LogItem;
