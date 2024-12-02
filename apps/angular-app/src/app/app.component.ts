import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NxAngularFileManagerComponent } from "@ngeenx/nx-angular-file-manager";
import {
  FileActionType,
  IFile,
  IFileContextEvent,
  IFileContextMenuItem,
} from "@ngeenx/nx-file-manager-utils";
import {
  LucideAngularModule,
  FolderPen,
  Scissors,
  Copy,
  ClipboardPaste,
  Trash2,
  Files,
  File,
  Folder,
  FolderPlus,
  FilePlus,
} from "lucide-angular";

@Component({
  standalone: true,
  imports: [RouterModule, NxAngularFileManagerComponent],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  public FolderPen = FolderPen;
  public Scissors = Scissors;
  public Copy = Copy;
  public ClipboardPaste = ClipboardPaste;
  public Trash2 = Trash2;
  public Files = Files;
  public Folder = Folder;
  public File = File;
  public FolderPlus = FolderPlus;
  public FilePlus = FilePlus;

  public fileContextMenuItems: IFileContextMenuItem[] = [
    {
      label: "Rename",
      icon: FolderPen,
      data: FileActionType.RENAME,
      action: (item: IFileContextMenuItem, event: IFileContextEvent) =>
        this.fileMenuAction(item, event),
    },
    {
      label: "Cut",
      icon: Scissors,
      data: FileActionType.CUT,
      action: (item: IFileContextMenuItem, event: IFileContextEvent) =>
        this.fileMenuAction(item, event),
    },
    {
      label: "Copy",
      icon: Copy,
      data: FileActionType.COPY,
      action: (item: IFileContextMenuItem, event: IFileContextEvent) =>
        this.fileMenuAction(item, event),
    },
    {
      label: "Paste",
      icon: ClipboardPaste,
      data: FileActionType.PASTE,
      action: (item: IFileContextMenuItem, event: IFileContextEvent) =>
        this.fileMenuAction(item, event),
    },
    {
      label: "Delete",
      icon: Trash2,
      data: FileActionType.DELETE,
      action: (item: IFileContextMenuItem, event: IFileContextEvent) =>
        this.fileMenuAction(item, event),
    },
  ];

  public explorerContextMenuItems: IFileContextMenuItem[] = [
    {
      label: "Create Folder",
      icon: FolderPlus,
      data: "CreateNewFolder",
      action: (item: IFileContextMenuItem, event: any) =>
        this.explorerMenuAction(item, event),
    },
    {
      label: "Create File",
      icon: FilePlus,
      data: "CreateNewFile",
      action: (item: IFileContextMenuItem, event: any) =>
        this.explorerMenuAction(item, event),
    },
  ];

  public fileMenuAction(
    item: IFileContextMenuItem,
    event: IFileContextEvent
  ): void {
    console.log(item, event);
  }

  public explorerMenuAction(
    item: IFileContextMenuItem,
    event: IFileContextEvent
  ): void {
    console.log(item, event);
  }
}
