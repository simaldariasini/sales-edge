import type { ReactNode } from "react";

export interface NestedItem {
  title: string;
}

export interface MenuChild {
  title: string;
  nested?: NestedItem[];
}

export interface MenuItemType {
  title: string;
  path?: string;
  children?: MenuItemType[];
  icon?: ReactNode;
  nested?: MenuItemType[];
}

