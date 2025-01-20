import { Component, Input } from "@angular/core";
import { IFile } from "@ngeenx/nx-file-manager-utils";
import { LucideAngularModule, ChevronRight, ChevronDown } from "lucide-angular";
import { TreeItemComponent } from "../tree-item/tree-item.component";
import { FolderTreeContextMenuService } from "../../../services/folder-tree-context-menu.service";
import { NxOvalLoaderComponent } from "@ngeenx/nx-angular-svg-loaders";

@Component({
  selector: "nx-fm-sticky-tree-item",
  templateUrl: "./sticky-tree-item.component.html",
  standalone: true,
  imports: [LucideAngularModule, TreeItemComponent, NxOvalLoaderComponent],
})
export class StickyTreeItemComponent {
  @Input()
  public file!: IFile;

  public ChevronRight = ChevronRight;
  public ChevronDown = ChevronDown;

  constructor(
    private folderTreeContextMenuService: FolderTreeContextMenuService
  ) {}

  public onItemClick(): void {
    if (this.file.isLoading) {
      return;
    }

    this.file.isExpanded = !this.file.isExpanded;

    if (!this.file.isExpanded) {
      const thisStickyTreeItem = document.getElementById(
        `nx-fm-sticky-header-${this.file.id}`
      );

      if (thisStickyTreeItem?.parentElement) {
        thisStickyTreeItem?.classList.remove("fixed-header");
      }

      this.collapseAllChildren(this.file);
    }
  }

  public onChevronClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.onItemClick();
  }

  public onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.folderTreeContextMenuService.contextMenuTrigger.emit({
      event,
      file: this.file,
      parent: null,
    });
  }

  private collapseAllChildren(file: IFile): void {
    if (file.items) {
      file.items.forEach((item) => {
        item.isExpanded = false;
        this.collapseAllChildren(item);
      });
    }
  }
}
