import { Band } from './UserSettings';

/**
 * color data. e.g for bands
 */
export type ColorData = Band

// tailwindcolors
export const mockColorData: ColorData[] = [
  {
    color: '#10B981',
    weight: 40,
    metric: 'LBS',
    id: 1
  },
  {
    color: '#EF4444',
    weight: 30,
    metric: 'LBS',
    id: 2
  }
];
