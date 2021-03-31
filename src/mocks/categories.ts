import { Category } from '../types/Category';
import { benchPress, squat } from './exercises';

const chest: Category = {
  name: 'Chest',
  color: '#faa',
  exercises: [benchPress],
};

const legs: Category = {
  name: 'Legs',
  color: '#afa',
  exercises: [squat],
};

const fullBody: Category = {
  name: 'Full body',
  color: '#aaf',
  exercises: [benchPress, squat],
};

export { chest, legs, fullBody };
