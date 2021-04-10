import { CompleteExerciseNoLog, CompleteExercise } from './Exercise';

export type WorkoutTemplate = {
  /**
   * template id for the workout. describes the structure of workout
   */
  templateId: string;
  /**
   * name of the workout
   */
  name: string;
  /**
   * exercises of the workout (should already have tag and order)
   */
  exercises: CompleteExerciseNoLog[];
  /**
   * tags for the workout
   */
  // tags: string[]
};

export type Workout = {
  /**
   * name of the workout
   */
  name: string;
  /**
   * template id for the workout. describes the structure of workout
   */
  templateId: string;
  /**
   * exercises of the workout (should now also have log(s))
   */
  exercises: CompleteExercise[];
  /**
   * date of the workout
   */
  date: Date;
  /**
   * tag for the workout
   */
  // tags: string[]
};
