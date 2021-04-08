import { CompleteExercise, CompleteExerciseNoLog } from '../types/Exercise';

const benchPress: CompleteExerciseNoLog = {
  name: 'Bench Press',
  sets: '3-4',
  reps: '6-8',
  id: 'bench-press',
  tags: [],
  order: 0,
};

const frontSquat: CompleteExerciseNoLog = {
  name: 'Front Squat',
  sets: '2-3',
  reps: '8-12',
  id: 'front-squat',
  tags: [],
  order: 0,
};

const benchPressLog1: CompleteExercise = {
  ...benchPress,
  logs: [
    {
      reps: 6,
      weight: 10,
      metric: 'KG',
      order: 0,
      review: {
        indicator: 'UP',
        note: 'Warm up',
      },
    },
    {
      reps: 4,
      weight: 20,
      metric: 'KG',
      order: 1,
      review: {
        indicator: 'DOWN',
        note: '',
      },
    },
  ],
};

const benchPressLog2: CompleteExercise = {
  ...benchPress,
  logs: [
    {
      reps: 10,
      weight: 12,
      metric: 'KG',
      order: 0,
      review: {
        indicator: 'STAY',
        note: 'Good form.',
      },
    },
    {
      reps: 12,
      weight: 8,
      metric: 'KG',
      order: 1,
      review: {
        indicator: '?',
      },
    },
  ],
};

const frontSquatLog1: CompleteExercise = {
  ...frontSquat,
  logs: [
    {
      reps: 15,
      weight: 20,
      metric: 'KG',
      order: 0,
      review: {
        indicator: 'STAY',
        note: 'Good form.',
      },
    },
    {
      reps: 12,
      weight: 30,
      metric: 'KG',
      order: 1,
      review: {
        indicator: '?',
      },
    },
  ],
};

const frontSquatLog2: CompleteExercise = {
  ...frontSquat,
  logs: [
    {
      reps: 6,
      weight: 50,
      metric: 'KG',
      order: 0,
      review: {
        indicator: 'DOWN',
        note: 'Ego lifting 👎',
      },
    },
  ],
};

export {
  benchPress,
  frontSquat,
  frontSquatLog1,
  frontSquatLog2,
  benchPressLog1,
  benchPressLog2,
};
