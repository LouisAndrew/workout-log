import { CompleteExerciseNoLog, CompleteExercise } from './Exercise';

export type WorkoutTemplate = {
  /**
   * template id for the workout. describes the structure of workout
   */
  templateId: string;
  /**
   * exercises of the workout (should already have tag and order)
   */
  exercises: CompleteExerciseNoLog[];
};

export type Workout = {
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
};
