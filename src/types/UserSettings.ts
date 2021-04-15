import { M as Metric } from './Set';

export type Band = {
  /**
   * color of the band
   */
  color: string
  /**
   * equivalent weight of the band
   */
  weight: number
  /**
   * metric of the band weight
   */
  metric: Metric
  /**
   * identifier of the band
   */
  id: number
}

export type UserSettings = {
  /**
   * bands owned by the user
   */
  bands?: Band[]
}
