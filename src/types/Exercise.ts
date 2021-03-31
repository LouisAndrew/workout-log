import { Tag } from './Tag';

export type Review = 'UP' | 'DOWN' | 'STAY';
export type Metric = 'kg' | 'lbs';
export type ExerciseSet = {
  /**
   * weight lifted during the set
   */
  weight: number;
  /**
   * number of reps lifted during the set
   */
  reps: number;
  /**
   * review for the current set (OPTIONAL. FOR PERSONAL USE ONLY)
   */
  review?: Review;
};

export type Exercise = {
  /**
   * name of the exercise
   */
  name: string;
  /**
   * number of sets of the exercise (can be a range)
   */
  sets: string;
  /**
   * number of reps of the exercise (can be a range)
   */
  reps: string;
  /**
   * automatically generated id of the exercise. see: helper/generateUniqueId
   */
  id?: string;
};

export type ExerciseWithTags<E extends Exercise> = E & {
  /**
   * tags that need to be applied to the exercise.
   */
  tags: Tag[];
};

export type ExerciseWithLog<E extends Exercise> = E & {
  /**
   * metric of the weight lifted
   */
  metric: Metric;
  /**
   * logs of the set done during the exercise.
   */
  logs: ExerciseSet[];
};

export type ExerciseWithOrder<E extends Exercise> = E & {
  /**
   * order of the exercise within a workout session. starts with: 1
   */
  order: number;
};
