import { EventEmitter, Injectable } from "@angular/core";
import { IFile } from "@ngeenx/nx-file-manager-utils";

export interface IFolderTreeFileContextMenuEvent {
  event: MouseEvent;
  file: IFile;
  parent: IFile | null;
}

@Injectable()
export class FolderTreeContextMenuService {
  public contextMenuTrigger: EventEmitter<IFolderTreeFileContextMenuEvent> =
    new EventEmitter();

  constructor() {}
}
