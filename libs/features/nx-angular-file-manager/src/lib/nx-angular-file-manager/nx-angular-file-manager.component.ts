import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NxAngularSidebarComponent } from "./components/sidebar/sidebar.component";
import {
  FileType,
  IBreadcrumbItem,
  IFile,
  IFileContextMenuItem,
  ITab,
} from "@ngeenx/nx-file-manager-utils";
import { ExplorerComponent } from "./components/explorer/explorer.component";
import { NxAngularTabsComponent } from "./components/tabs/tabs/tabs.component";
import { NxAngularTabComponent } from "./components/tabs/tab/tab.component";
import { timer } from "rxjs";
import { LucideAngularModule, Folder, File } from "lucide-angular";
import {
  INxFileManagerOptions,
  defaultOptions,
} from "libs/utils/nx-file-manager-utils/src/lib/models/options.model";

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

  @Input()
  public options: Partial<INxFileManagerOptions> = defaultOptions;

  @Input()
  public theme: "dark" | "light" = "light";

  // #endregion

  public Folder = Folder;
  public File = File;

  public sidebarFolderTreeFiles: IFile[] = [];
  public tabs: ITab[] = [];

  public ngOnInit(): void {
    this.sidebarFolderTreeFiles = Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      name: `i ${i + 1}`,
      hasItems: true,
      items: Array.from({ length: 5 }).map((_, j) => ({
        id: j + 1,
        icon: this.Folder,
        name: `j ${j + 1}`,
        path: `j-${j + 1}`,
        type: FileType.FOLDER,
        hasItems: true,
        isExpanded: true,
        items: Array.from({ length: 5 }).map((_, k) => ({
          id: k + 1,
          icon: this.Folder,
          name: `k ${k + 1}`,
          path: `k-${k + 1}`,
          type: FileType.FOLDER,
          hasItems: true,
          isExpanded: false,
          items: Array.from({ length: 5 }).map((_, l) => ({
            id: l + 1,
            icon: this.Folder,
            name: `l ${l + 1}`,
            path: `l-${l + 1}`,
            type: FileType.FOLDER,
            hasItems: true,
            isExpanded: false,
            items: Array.from({ length: 5 }).map((_, m) => ({
              id: m + 1,
              icon: this.Folder,
              name: `m ${m + 1}`,
              path: `m-${m + 1}`,
              type: FileType.FOLDER,
              hasItems: false,
            })),
          })),
        })),
      })),
      isExpanded: false,
    })) as IFile[];

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
      rootCrumb: {
        file: {
          id: 1,
          name: "My Files",
          icon: this.Folder,
          path: "files",
          type: FileType.FOLDER,
        },
        onClick: (tab: ITab, breadcrumbItem: IBreadcrumbItem) => {
          console.log("Files", tab, breadcrumbItem);
          tab.breadcrumbs = [];
          tab.breadcrumbHistory.push([]);
        },
      },
      breadcrumbs: [
        {
          file: {
            id: 1,
            name: "Files",
            icon: this.Folder,
            path: "files",
            type: FileType.FOLDER,
          },
          isLoading: false,
          isDisabled: false,
          onClick: () => {
            console.log("Files");
          },
        },
      ],
      breadcrumbHistory: [],
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
      rootCrumb: {
        file: {
          id: 1,
          name: "My Files",
          icon: this.Folder,
          path: "files",
          type: FileType.FOLDER,
        },
        onClick: () => {
          console.log("Files");
        },
      },
      breadcrumbs: [
        {
          file: {
            id: 1,
            name: "Files",
            icon: this.Folder,
            path: "files",
            type: FileType.FOLDER,
          },
          isLoading: false,
          isDisabled: false,
          onClick: () => {
            console.log("Files");
          },
        },
      ],
      breadcrumbHistory: [],
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
