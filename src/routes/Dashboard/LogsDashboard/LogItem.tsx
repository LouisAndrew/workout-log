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
  const { getTemplateNameAndColor } = useTemplate();
  const { user: userAuth } = useAuth();

  const user = userAuth() as User;

  const [name, setName] = useState('');
  const [color, setColor] = useState('gray-400');
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);

  const getNameFromDb = async () => {
    const res = await getTemplateNameAndColor(`${user.id}-${templateId}`);
    if (!res || res.error) {
      setErr(true);
      return;
    }

    setName(res.data[0].name);
    setColor(res.data[0].color || 'gray-400');
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
      <div className={`log-item__color bg-${color}`} />
      {name}
      <span className="log-item__date">
        {getReadableDate(new Date(timestamp))}
      </span>
    </button>
  );
};
export default LogItem;
