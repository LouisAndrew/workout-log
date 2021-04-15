import { colors } from '@/types/Colors';
import { Band } from '@t/UserSettings';

const mockBand1: Band = {
  color: colors.green,
  weight: 10,
  metric: 'KG',
  id: 1
};

const mockBand2: Band = {
  color: colors.red,
  weight: 20,
  metric: 'KG',
  id: 2
};

const mockBands = [mockBand1, mockBand2];

export { mockBand1, mockBand2, mockBands };
