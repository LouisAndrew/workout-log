export type Metric = 'kg' | 'lbs';
export type Review = {
  /**
   * indicator of how the set / exercise was
   */
  review: 'UP' | 'DOWN' | 'STAY'
  /**
   * additional / optional note that user could input
   */
  note?: string
};

export type ExerciseSet = {
  /**
   * weight lifted during the set
   */
  weight: number;
  /**
   * metric of which the weight should be counted
   */
  metric: Metric;
  /**
   * number of reps lifted during the set
   */
  reps: number;
  /**
   * review for the current set (OPTIONAL. FOR PERSONAL USE ONLY)
   */
  review?: Review;
};
