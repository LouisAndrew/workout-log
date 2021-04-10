import { UserDataTable } from '@/types/tables';
import { useStorage, TABLES } from './useStorage';

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
    const templates = await getUserTemplate(uid);
    if (!templates) {
      return false;
    }

    const userData = await getUserData(uid);
    const newTemplates = [
      ...templates.filter((id) => (remove ? id !== remove : id)),
      templateString,
    ];

    const res = await update({ ...userData, templates: newTemplates }, { uuid: uid });
    return res;
  };

  return { getUserTemplate, updateUserTemplate };
};
