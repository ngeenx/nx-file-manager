export enum FileType {
  FOLDER = "folder",
  FILE = "file",
  SYMLINK = "symlink",
}

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
  type: FileType;
  selected?: boolean;
}
