export interface ISidebarGroup {
  id: string | number;
  name: string;
  items: ISidebarItem[];
}

export interface ISidebarItem {
  icon: string;
  name: string;
  path: string;
  type: string;
  selected?: boolean;
}
