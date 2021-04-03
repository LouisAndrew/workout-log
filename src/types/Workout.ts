import {
  Exercise as E, ExerciseWithLog, ExerciseWithOrder, ExerciseWithTags
} from './Exercise';

type Exercise = ExerciseWithOrder<ExerciseWithTags<E>>

export type WorkoutTemplate = {
  /**
   * template id for the workout. describes the structure of workout
   */
  templateId: string;
  /**
   * exercises of the workout (should already have tag and order)
   */
 exercises: Exercise[];
}

export type Workout = WorkoutTemplate & {
  /**
   * exercises of the workout (should now also have log(s))
   */
  exercises: ExerciseWithLog<Exercise>[]
  /**
   * date of the workout
   */
  date: Date;
}
