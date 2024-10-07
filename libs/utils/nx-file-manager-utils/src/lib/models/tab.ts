import { IFile } from "./file";

export interface ITab {
  id: string | number;
  name: string;
  path: string;
  isSelected?: boolean;
  files: IFile[];
}
