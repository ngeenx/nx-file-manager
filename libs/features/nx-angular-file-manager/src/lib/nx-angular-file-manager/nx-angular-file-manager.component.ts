import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  folderIconData,
  fileIconData,
  fileMultipleIconData,
} from "@ngeenx/nx-file-manager-icons";

import { NxAngularSidebarComponent } from "./components/sidebar/sidebar.component";
import {
  FileType,
  IFile,
  IFileGroup,
  ITab,
} from "@ngeenx/nx-file-manager-utils";
import { ExplorerComponent } from "./components/explorer/explorer.component";
import { NxAngularTabsComponent } from "./components/tabs/tabs/tabs.component";
import { NxAngularTabComponent } from "./components/tabs/tab/tab.component";
import { timer } from "rxjs";

@Component({
  selector: "nx-angular-file-manager",
  standalone: true,
  imports: [
    CommonModule,
    NxAngularSidebarComponent,
    ExplorerComponent,
    NxAngularTabsComponent,
    NxAngularTabComponent,
  ],
  templateUrl: "./nx-angular-file-manager.component.html",
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NxAngularFileManagerComponent implements OnInit {
  public iconSet: { [key: string]: string } = {
    folderIconData,
    fileIconData,
    fileMultipleIconData,
  };

  public sidebarGroups: IFileGroup[] = [];
  public files: IFile[] = [];
  public tabs: ITab[] = [];

  public constructor(private chnageDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.sidebarGroups = Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      name: `Group ${i + 1}`,
      items: Array.from({ length: 10 }).map((_, j) => ({
        id: j + 1,
        icon: "folderIconData",
        name: `Item ${j + 1}`,
        path: `item-${j + 1}`,
        type: FileType.FOLDER,
      })),
      isCollapsed: false,
    }));

    this.files = Array.from({ length: 20 }).map((_, i) => ({
      id: i + 1,
      icon: i % 2 === 0 ? "fileIconData" : "folderIconData",
      name: `File file File file File ${i + 1}`,
      path: `file-${i + 1}`,
      type: i % 2 === 0 ? FileType.FILE : FileType.FOLDER,
    }));

    this.files.push({
      id: this.files.length + 1,
      icon: "https://images.unsplash.com/photo-1727042395792-803ce6f1b9bb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: `File file File file File ${this.files.length + 1}`,
      path: `file-${this.files.length + 1}`,
      type: this.files.length % 2 === 0 ? FileType.FILE : FileType.FOLDER,
    });

    this.tabs.push(<ITab>{
      id: 1,
      name: "Files",
      path: "files",
      files: [...this.files],
    });
  }

  public onNewTabClick(): void {
    this.tabs.push({
      id: this.tabs.length + 1,
      name: `Tab ${this.tabs.length + 1}`,
      path: `tab-${this.tabs.length + 1}`,
      files: [...this.files],
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

    targetTab.isSelected = false;

    this.chnageDetectorRef.detectChanges();

    this.tabs = this.tabs.filter((tab: ITab) => tab !== targetTab);

    timer(100).subscribe(() => {
      if (this.tabs[targetTabIndex]) {
        this.tabs.forEach((tab: ITab, index: number) => {
          tab.isSelected = index === targetTabIndex;
        });
      } else if (this.tabs[this.tabs.length + 1]) {
        this.tabs.forEach((tab: ITab, index: number) => {
          tab.isSelected = index === this.tabs.length + 1;
        });
      } else if (this.tabs[0]) {
        this.tabs.forEach((tab: ITab, index: number) => {
          tab.isSelected = index === 0;
        });
      }
    });
  }
}
