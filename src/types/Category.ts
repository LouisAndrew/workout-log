import { Exercise } from './Exercise';

/**
 * category of exercises (could also be body part!)
 */
export type Category = {
  /**
   * name of the category
   */
  name: string;
  /**
   * exercises within the category
   */
  exercises: Exercise[];
  /**
   * color code for the category
   */
  color?: string;
};
