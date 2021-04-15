import { UserDataTable } from '@t/tables';
import { UserSettings, Band } from '@t/UserSettings';
import { useStorage, TABLES } from './useStorage';

const createLogId = (templateId: string, timestamp: number) =>
  `${templateId}--${timestamp}`;
const subtractLogId = (logId: string): [string, number] => {
  const splitted = logId.split('--');
  if (splitted.length === 2) {
    return [splitted[0], parseInt(splitted[1], 10)];
  }

  return [splitted[0], new Date().getTime()];
};

// eslint-disable-next-line import/prefer-default-export
export const useUserData = () => {
  const { read, update } = useStorage(TABLES.USER_DATA);

  const getUserTemplate = async (uid: string): Promise<string[] | false> => {
    const query = `
      templates
    `;
    const res = await read(query, { uuid: uid });
    if (res) {
      return (res.data as any)[0].templates;
    }
    return false;
  };

  const getUserData = async (uid: string): Promise<UserDataTable | false> => {
    const res = await read(undefined, { uuid: uid });
    if (res) {
      return res.data[0];
    }

    return false;
  };

  const updateUserTemplate = async (
    uid: string,
    templateString: string,
    remove?: string
  ): Promise<boolean> => {
    if (remove && templateString === remove) {
      return true;
    }

    const templates = await getUserTemplate(uid);
    if (!templates) {
      return false;
    }

    const userData = await getUserData(uid);
    const newTemplates = templates.includes(templateString) ? templates : [
      ...templates.filter((id) => (remove ? id !== remove : id)),
      templateString,
    ];

    const res = await update(
      { ...userData, templates: newTemplates },
      { uuid: uid }
    );
    return res;
  };

  const getUserLogs = async (
    userId: string,
    splitted: boolean = false
  ): Promise<[string, number][] | string[] | false> => {
    const query = `
      logs
    `;

    const res = await read(query, { uuid: userId });
    if (res) {
      if (splitted) {
        return res.data[0].logs.map((s: string) => subtractLogId(s));
      }
      return res.data[0].logs;
    }
    return false;
  };

  const getUserLogsByTemplate = async (templateId: string, uid: string) => {
    const res = await getUserLogs(uid, true);
    if (!res) {
      return [];
    }

    return (res as [string, number][]).filter(([id]: [string, number]) => id.includes(templateId));
  };

  const updateUserLogs = async (
    templateId: string,
    timestamp: number,
    userId: string,
    remove?: string
  ): Promise<boolean> => {
    const logs = (await getUserLogs(userId)) as string[] | false;
    if (!logs) {
      return false;
    }

    const userData = await getUserData(userId);
    const newLogs = [
      ...logs.filter((l) => (remove ? l !== remove : l)),
      createLogId(templateId, timestamp),
    ];

    const res = await update({ ...userData, logs: newLogs }, { uuid: userId });
    return res;
  };

  const getLogsData = async (uid: string) => {
    const query = `
    logs
  `;
    const res = await read(query, { uuid: uid });
    if (!res || res.error) {
      return [];
    }
    return res.data[0].logs;
  };

  const getLogCount = async (
    uid: string,
    templateId: string
  ): Promise<number> => {
    const logsData = await getLogsData(uid);

    return logsData.filter((l: string) => l.includes(templateId)).length;
  };

  const getLastWorkout = async (
    uid: string,
    templateId: string
  ): Promise<number> => {
    const logsData = await getLogsData(uid);
    const timestamps = logsData
      .filter((l: string) => l.includes(templateId))
      .map((logId: string) => subtractLogId(logId)[1]);

    return timestamps.length > 0 ? [...timestamps].sort((a, b) => b - a)[0] : 0;
  };

  const getLogsDataDashboard = async (uid: string, templateId: string) => ({
    logCount: await getLogCount(uid, templateId),
    lastWorkout: await getLastWorkout(uid, templateId),
  });

  /**
   * get user's settings
   * @param uid user id
   */
  const getUserSettings = async (uid: string) => {
    const query = `
      settings
    `;
    const response = await read(query, { uuid: uid });
    if (!response || response.error || !response.data[0]) {
      return null;
    }

    const data = response.data[0].settings;
    return JSON.parse(data) as UserSettings;
  };

  /**
   * get user's added bands
   * @param uid user id
   */
  const getUserBands = async (uid: string): Promise<Band[]> => {
    const data = await getUserSettings(uid);
    if (!data) {
      return [];
    }

    return data.bands || [];
  };

  /**
   * function to update user's settings
   * @param uid user id
   * @param settings setting object (to be stringified)
   */
  const updateSettings = async (uid: string, settings: UserSettings): Promise<boolean> => {
    const userData = await getUserData(uid);
    if (!userData) {
      return false;
    }

    const userDataModified = {
      ...userData,
      settings: JSON.stringify(settings)
    };

    return update(userDataModified, { uuid: uid });
  };

  return {
    getUserTemplate,
    updateUserTemplate,
    getUserLogs,
    updateUserLogs,
    getLogCount,
    getLogsDataDashboard,
    getUserLogsByTemplate,
    getUserSettings,
    getUserBands,
    updateSettings
  };
};
