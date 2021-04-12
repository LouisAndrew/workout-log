import { Metric } from './Set';

/**
 * color data. e.g for bands
 */
export type ColorData = {
  color: string
  weight: number
  metric: Metric
  identifier: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
}
