export interface IFileGroup {
  id: string | number;
  name: string;
  items?: IFile[];
  preview?: string;
  isCollapsed?: boolean;
}

export interface IFile {
  icon: string;
  name: string;
  path: string;
  type: string;
  selected?: boolean;
}
