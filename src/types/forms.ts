import type { MediaType } from './media';

export type BottomSheetFormData = {
  type: MediaType;
  name: string;
  durationMinutes: number;
  date?: string;
};
