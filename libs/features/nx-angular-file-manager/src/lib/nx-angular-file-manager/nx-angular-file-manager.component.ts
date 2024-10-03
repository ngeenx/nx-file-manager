import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

import { folderIconData, fileIconData } from "@ngeenx/nx-file-manager-icons";

import { NxAngularSidebarComponent } from "./components/sidebar/sidebar.component";
import { ISidebarGroup } from "@ngeenx/nx-file-manager-utils";

@Component({
  selector: "nx-angular-file-manager",
  standalone: true,
  imports: [CommonModule, NxAngularSidebarComponent],
  templateUrl: "./nx-angular-file-manager.component.html",
})
export class NxAngularFileManagerComponent implements OnInit {
  public iconSet: { [key: string]: string } = {
    folderIconData,
    fileIconData,
  };

  public sidebarGroups: ISidebarGroup[] = [];

  public ngOnInit(): void {
    this.sidebarGroups = Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      name: `Group ${i + 1}`,
      items: Array.from({ length: 10 }).map((_, j) => ({
        icon: "folderIconData",
        name: `Item ${j + 1}`,
        path: `item-${j + 1}`,
        type: "folder",
      })),
    }));
  }
}
