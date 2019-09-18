import { ReactNode } from 'react';

export type MenuItem = {
  icon: ReactNode,
  label: string,
};

export interface BaseMenuProps {
  horizontal?: boolean;
  items: MenuItem[];
  onSelect?: (row: number, col?: number) => void;
  children?: ReactNode;
};
