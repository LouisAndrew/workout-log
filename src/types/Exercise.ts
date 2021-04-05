import { Tag } from './Tag';
import { ExerciseSet } from './Set';

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

export type CompleteExerciseNoLog = ExerciseWithOrder<
  ExerciseWithTags<Exercise>
>;

export type CompleteExercise = ExerciseWithLog<CompleteExerciseNoLog>;
