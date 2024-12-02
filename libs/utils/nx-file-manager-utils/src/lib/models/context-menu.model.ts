import { FileActionType } from "./action.model";
import { IFile } from "./file.model";

export interface IFileContextMenuEvent {
  nativeEvent: MouseEvent | PointerEvent | KeyboardEvent;
  value: IFile | IFile[];
}

export interface IFileContextMenuItem {
  label: string;
  icon: any;
  data: any;
  action: (item: IFileContextMenuItem, event: IFileContextMenuEvent) => void;
}
