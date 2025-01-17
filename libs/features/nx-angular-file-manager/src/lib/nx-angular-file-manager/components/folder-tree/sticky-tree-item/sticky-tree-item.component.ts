import { Component, Input } from "@angular/core";
import { IFile } from "@ngeenx/nx-file-manager-utils";
import { LucideAngularModule, ChevronRight, ChevronDown } from "lucide-angular";
import { TreeItemComponent } from "../tree-item/tree-item.component";
import { FolderTreeContextMenuService } from "../../../services/folder-tree-context-menu.service";

@Component({
  selector: "nx-fm-sticky-tree-item",
  templateUrl: "./sticky-tree-item.component.html",
  standalone: true,
  imports: [LucideAngularModule, TreeItemComponent],
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
    this.file.isExpanded = !this.file.isExpanded;

    if (!this.file.isExpanded) {
      const thisStickyTreeItem = document.getElementById(
        `nx-fm-sticky-title-${this.file.id}`
      );

      if (thisStickyTreeItem?.parentElement) {
        thisStickyTreeItem?.classList.remove("fixed-title");
      }
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
}
