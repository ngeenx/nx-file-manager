import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NxAngularSidebarComponent } from "./components/sidebar/sidebar.component";
import {
  FileType,
  IFileContextMenuItem,
  IFileGroup,
  ITab,
} from "@ngeenx/nx-file-manager-utils";
import { ExplorerComponent } from "./components/explorer/explorer.component";
import { NxAngularTabsComponent } from "./components/tabs/tabs/tabs.component";
import { NxAngularTabComponent } from "./components/tabs/tab/tab.component";
import { timer } from "rxjs";
import { LucideAngularModule, Folder, File } from "lucide-angular";

@Component({
  selector: "nx-file-manager",
  standalone: true,
  imports: [
    CommonModule,
    NxAngularSidebarComponent,
    ExplorerComponent,
    NxAngularTabsComponent,
    NxAngularTabComponent,
    LucideAngularModule,
  ],
  templateUrl: "./nx-angular-file-manager.component.html",
})
export class NxAngularFileManagerComponent implements OnInit {
  // #region Inputs

  @Input()
  public fileContextMenuItems: IFileContextMenuItem[] = [];

  @Input()
  public explorerContextMenuItems: IFileContextMenuItem[] = [];

  // #endregion

  public Folder = Folder;
  public File = File;

  public sidebarGroups: IFileGroup[] = [];
  public tabs: ITab[] = [];

  public ngOnInit(): void {
    this.sidebarGroups = Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      name: `Group ${i + 1}`,
      items: Array.from({ length: 10 }).map((_, j) => ({
        id: j + 1,
        icon: this.Folder,
        name: `Item ${j + 1}`,
        path: `item-${j + 1}`,
        type: FileType.FOLDER,
        hasItems: true,
        items: Array.from({ length: 10 }).map((_, k) => ({
          id: k + 1,
          icon: this.Folder,
          name: `Item ${k + 1}`,
          path: `item-${k + 1}`,
          type: FileType.FOLDER,
          hasItems: false,
        })),
      })),
      isCollapsed: false,
    }));

    const files = Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      icon: i % 2 === 0 ? this.File : this.Folder,
      name: `File file File file File ${i + 1}`,
      path: `file-${i + 1}`,
      type: i % 2 === 0 ? FileType.FILE : FileType.FOLDER,
    }));

    // this.files.push({
    //   id: this.files.length + 1,
    //   icon: "https://images.unsplash.com/photo-1727042395792-803ce6f1b9bb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   name: `File file File file File ${this.files.length + 1}`,
    //   path: `file-${this.files.length + 1}`,
    //   type: this.files.length % 2 === 0 ? FileType.FILE : FileType.FOLDER,
    // });

    this.tabs.push(<ITab>{
      id: 1,
      name: "Files",
      path: "files",
      currentFolder: files[0],
      files: files,
    });
  }

  public onNewTabClick(): void {
    const files = Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      icon: i % 2 === 0 ? this.File : this.Folder,
      name: `File file File file File ${i + 1}`,
      path: `file-${i + 1}`,
      type: i % 2 === 0 ? FileType.FILE : FileType.FOLDER,
    }));

    this.tabs.push({
      id: this.tabs.length + 1,
      name: `Tab ${this.tabs.length + 1}`,
      path: `tab-${this.tabs.length + 1}`,
      currentFolder: files[0],
      files: files,
    });

    this.tabs.forEach((tab: ITab, index: number) => {
      tab.isSelected = index === this.tabs.length - 1;
    });
  }

  public onTabClick(targetTab: ITab): void {
    this.tabs.forEach((tab: ITab) => {
      tab.isSelected = tab === targetTab;
    });
  }

  public onTabClose(targetTab: ITab): void {
    const targetTabIndex = this.tabs.findIndex(
      (tab: ITab) => tab === targetTab
    );

    this.tabs = this.tabs.filter((tab: ITab) => tab !== targetTab);

    // if this tab is selected
    if (targetTab.isSelected) {
      targetTab.isSelected = false;

      // select closest tab
      timer(100).subscribe(() => {
        if (this.tabs[targetTabIndex]) {
          this.tabs.forEach((tab: ITab, index: number) => {
            tab.isSelected = index === targetTabIndex;
          });
        } else if (this.tabs[this.tabs.length - 1]) {
          this.tabs.forEach((tab: ITab, index: number) => {
            tab.isSelected = index === this.tabs.length - 1;
          });
        } else if (this.tabs[this.tabs.length + 1]) {
          this.tabs.forEach((tab: ITab, index: number) => {
            tab.isSelected = index === this.tabs.length + 1;
          });
        }
      });
    }
  }
}
