import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

import { folderIconData, fileIconData } from "@ngeenx/nx-file-manager-icons";

import { NxAngularSidebarComponent } from "./components/sidebar/sidebar.component";
import { FileType, IFile, IFileGroup } from "@ngeenx/nx-file-manager-utils";
import { ExplorerComponent } from "./components/explorer/explorer.component";

@Component({
  selector: "nx-angular-file-manager",
  standalone: true,
  imports: [CommonModule, NxAngularSidebarComponent, ExplorerComponent],
  templateUrl: "./nx-angular-file-manager.component.html",
})
export class NxAngularFileManagerComponent implements OnInit {
  public iconSet: { [key: string]: string } = {
    folderIconData,
    fileIconData,
  };

  public sidebarGroups: IFileGroup[] = [];
  public files: IFile[] = [];

  public ngOnInit(): void {
    this.sidebarGroups = Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      name: `Group ${i + 1}`,
      items: Array.from({ length: 10 }).map((_, j) => ({
        icon: "folderIconData",
        name: `Item ${j + 1}`,
        path: `item-${j + 1}`,
        type: FileType.FOLDER,
      })),
      isCollapsed: false,
    }));

    this.files = Array.from({ length: 100 }).map((_, i) => ({
      icon: i % 2 === 0 ? "fileIconData" : "folderIconData",
      name: `File file File file File ${i + 1}`,
      path: `file-${i + 1}`,
      type: i % 2 === 0 ? FileType.FILE : FileType.FOLDER,
    }));
  }
}
