/* eslint-disable object-curly-newline */
import { Workout, WorkoutTemplate } from '@t/Workout';
import {
  benchPress,
  benchPressLog1,
  benchPressLog2,
  frontSquat,
  frontSquatLog1,
  frontSquatLog2,
} from './exercises';

const templateId = 'mock-template';

const template: WorkoutTemplate = {
  templateId,
  name: 'Sample Workout',
  exercises: [benchPress, frontSquat],
  // tags: []
};

const workout1: Workout = {
  ...template,
  exercises: [benchPressLog1, frontSquatLog1],
  date: new Date(Date.parse('15 Mar 2021')),
};

const workout2: Workout = {
  ...template,
  exercises: [benchPressLog2, frontSquatLog2],
  date: new Date(Date.parse('22 Mar 2021')),
};

const workout3: Workout = {
  ...template,
  exercises: [benchPressLog2],
  date: new Date(Date.parse('17 Mar 2021')),
};

export { template, workout1, workout2, workout3 };
