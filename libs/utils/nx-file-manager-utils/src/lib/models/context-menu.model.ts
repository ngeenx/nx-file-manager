import { FileActionType } from "./action.model";
import { IFile } from "./file.model";

export interface IFileContextEvent {
  event: MouseEvent;
  value: IFile;
}

export interface IFileContextMenuItem {
  label: string;
  icon: any;
  data: any;
  action: (item: IFileContextMenuItem, event: IFileContextEvent) => void;
}
