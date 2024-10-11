import { IFile } from "./file";

export interface ITab {
  id: string | number;
  name: string;
  path: string;
  currentFolder: IFile;
  isSelected?: boolean;
  files: IFile[];
}
