import { generateRandomWorkoutId } from '@helper/generateId';
import { R } from '@r/index';
import { WorkoutTemplate } from '@t/Workout';

import { useStorage, TABLES } from './useStorage';

// eslint-disable-next-line import/prefer-default-export
export const useTemplate = () => {
  const { create, read } = useStorage(TABLES.TEMPLATES);

  const createTemplate = async (uid: string) => {
    // todo: get all templates of the user,then create a new one with random id
    const randomTemplateId = `${uid}-${generateRandomWorkoutId([])}`;
    const template = {
      name: '',
      'template-id': randomTemplateId,
      exercises: [],
    };

    try {
      const isSuccessful = await create(template);
      if (isSuccessful) {
        return `${R.TEMPLATE}?id=${randomTemplateId}&create-new=true`;
      }
      // todo: create page for error route.
      console.log('err');
      return '/error';
    } catch (e) {
      console.error(e);
      console.log('err');
      return '/error';
    }
  };

  const getTemplate = async (templateId: string, userId: string) => {
    try {
      const res = await read(undefined, { 'template-id': templateId });
      if (!res) {
        return null;
      }

      const data = res.data[0];
      console.log(res);
      const template: WorkoutTemplate = {
        ...data,
        templateId: (data['template-id'] as string).replace(`${userId}-`, ''),
      };

      return template;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  return { createTemplate, getTemplate };
};
