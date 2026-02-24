import type { MediaType } from './media';

export type BottomSheetFormData = {
  type: MediaType;
  name: string;
  totalUnits: number;
  currentUnits: number;
  date?: string;
};
