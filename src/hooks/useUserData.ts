import { useStorage, TABLES } from './useStorage';

// eslint-disable-next-line import/prefer-default-export
export const useUserData = () => {
  const { read } = useStorage(TABLES.USER_DATA);

  const getUserTemplate = async (uid: string) => {
    const query = `
      templates
    `;
    const res = await read(query, { uuid: uid });
    if (res) {
      return (res.data as any)[0].templates;
    }
    return false;
  };

  return { getUserTemplate };
};
