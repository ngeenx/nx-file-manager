import { Component, Input } from "@angular/core";
import { IFile } from "@ngeenx/nx-file-manager-utils";
import { ChevronRight, ChevronDown, LucideAngularModule } from "lucide-angular";
import { FolderTreeContextMenuService } from "../../../services/folder-tree-context-menu.service";

@Component({
  selector: "nx-fm-tree-item",
  templateUrl: "./tree-item.component.html",
  standalone: true,
  imports: [LucideAngularModule],
})
export class TreeItemComponent {
  @Input()
  public file!: IFile;

  public ChevronRight = ChevronRight;
  public ChevronDown = ChevronDown;

  constructor(
    private folderTreeContextMenuService: FolderTreeContextMenuService
  ) {}

  public onItemClick(file: IFile): void {
    file.isExpanded = !file.isExpanded;
  }

  public onContextMenu(event: MouseEvent, _file: IFile): void {
    event.preventDefault();
    event.stopPropagation();

    this.folderTreeContextMenuService.contextMenuTrigger.emit({
      event,
      file: _file,
      parent: this.file,
    });
  }
}
