export type Metric = 'KG' | 'LBS' | '';
export type ReviewIndicator = 'UP' | 'DOWN' | 'STAY' | '?';

export type SetAndReps = {
  /**
   * number of reps lifted during the set
   */
  reps: number;
  /**
   * weight lifted during the set
   */
  weight: number;
};

export type Review = {
  /**
   * indicator of how the set / exercise was
   */
  review: ReviewIndicator;
  /**
   * additional / optional note that user could input
   */
  note?: string;
};

export type ExerciseSet = SetAndReps & {
  /**
   * metric of which the weight should be counted
   */
  metric: Metric;
  /**
   * review for the current set (OPTIONAL. FOR PERSONAL USE ONLY)
   */
  review?: Review;
};
