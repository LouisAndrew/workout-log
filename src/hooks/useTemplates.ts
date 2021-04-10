import { generateRandomWorkoutId } from '@helper/generateId';
import { R } from '@r/index';
import { WorkoutTemplate } from '@t/Workout';
import { TemplatesTable } from '@t/tables';

import { templateTableToType, templateTypeToTable } from '@helper/helperToType';
import { useStorage, TABLES } from './useStorage';
import { useExercises } from './useExercises';
import { useUserData } from './useUserData';

// eslint-disable-next-line import/prefer-default-export
export const useTemplate = () => {
  const { create, read, update } = useStorage(TABLES.TEMPLATES);
  const { getMultipleExercises, saveMultipleExercises } = useExercises();
  const { updateUserTemplate } = useUserData();

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
        const updatedUserTemplate = await updateUserTemplate(uid, randomTemplateId);
        if (updatedUserTemplate) {
          return `${R.TEMPLATE}?id=${randomTemplateId}&create-new=true`;
        }
      }
      // todo: create page for error route.
      return '/error';
    } catch (e) {
      console.error(e);
      return '/error';
    }
  };

  const getTemplate = async (templateId: string, userId: string) => {
    try {
      const res = await read(undefined, { 'template-id': templateId });
      if (!res) {
        return null;
      }

      const data: TemplatesTable = res.data[0];
      const exercises = await getMultipleExercises(data.exercises);
      console.log({ exercises });
      const template = templateTableToType(exercises, data, userId);
      console.log({ template });

      return template;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const updateTemplate = async (
    newTemplate: WorkoutTemplate,
    templateId: string,
    userId: string
  ) => {
    try {
      await saveMultipleExercises(newTemplate.exercises);
      const templateTable = templateTypeToTable(newTemplate, userId);
      const res = await update(templateTable, { 'template-id': templateId });
      if (res) {
        return true;
      }

      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return { createTemplate, getTemplate, updateTemplate };
};
