export enum FileType {
  FOLDER = "folder",
  FILE = "file",
  SYMLINK = "symlink",
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

  /**
   * Is this file/folder available to open context menu
   * For example if user is selecting other files but this one is not selected
   * but user wants to open context menu for this file. We can prevent opening the context menu
   */
  isContextMenuAvailable?: boolean;
}

export interface IFileUploadUi {
  /**
   * Candidate for upload
   */
  isReadyForUpload?: boolean;

  /**
   * Is this file uploading to the server
   */
  isUploading?: boolean;

  /**
   * Is this file uploading failed
   */
  isUploadingFailed?: boolean;

  /**
   * Is this file uploading success
   */
  isUploadingSuccess?: boolean;

  /**
   * File upload destination
   */
  targetFolder?: IFile;
}

export interface IFile extends IFileUi, IFileUploadUi {
  id: string | number;
  icon: any;
  name: string;
  path: string;
  type: FileType;
  hasItems?: boolean;
  isExpanded?: boolean;
  items?: IFile[] | null;
}
