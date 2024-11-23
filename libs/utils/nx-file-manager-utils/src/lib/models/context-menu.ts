import { FileActionType } from "./action";
import { IFile } from "./file";

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
