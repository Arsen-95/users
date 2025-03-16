import { User } from '@/shared/types';

export type ColumnData = {
  dataKey: keyof User;
  label: string;
};

export const columns: ColumnData[] = [
  { label: 'First name', dataKey: 'firstName' },
  { label: 'Last name', dataKey: 'lastName' },
  { label: 'City', dataKey: 'city' },
];
