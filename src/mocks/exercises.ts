import {
  Exercise,
  ExerciseWithLog,
  ExerciseWithOrder,
  ExerciseWithTags,
} from '../types/Exercise';

const benchPress: Exercise = {
  name: 'Bench Press',
  sets: '3-4',
  reps: '8-12',
};

const squat: Exercise = {
  name: 'Squat',
  sets: '2-3',
  reps: '10',
};

const benchPressTagged: ExerciseWithTags<Exercise> = {
  ...benchPress,
  tags: [
    {
      text: 'Chest',
      color: '#faa',
    },
  ],
};

const benchPressLogged: ExerciseWithLog<typeof benchPressTagged> = {
  ...benchPressTagged,
  logs: [
    {
      weight: 40,
      reps: 10,
      metric: 'KG',
      review: {
        indicator: '?',
        note: 'Keep up',
      },
      order: 1,
    },
  ],
};

const benchPressOrdered: ExerciseWithOrder<typeof benchPressLogged> = {
  ...benchPressLogged,
  order: 0,
};

export {
  benchPress,
  benchPressLogged,
  benchPressTagged,
  benchPressOrdered,
  squat,
};
