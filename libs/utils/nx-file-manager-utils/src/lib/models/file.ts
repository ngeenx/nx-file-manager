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

export interface IFileUi {
  /**
   * Is selected for any action (cut, copy, paste, move, etc.)
   */
  isSelected?: boolean;

  /**
   * Is any file/folder droppable into this one
   */
  isDroppable?: boolean;

  /**
   * Is any file/folder allowed to drop into this one
   */
  isDropAllowed?: boolean;

  /**
   * Is this file/folder unavailable to drop
   */
  isDropUnavailable?: boolean;
}

export interface IFile extends IFileUi {
  id: string | number;
  icon: string;
  name: string;
  path: string;
  type: FileType;
}
