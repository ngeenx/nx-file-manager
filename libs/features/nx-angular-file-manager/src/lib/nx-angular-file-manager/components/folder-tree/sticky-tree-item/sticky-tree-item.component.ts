import { Component, Input } from "@angular/core";
import { IFile } from "@ngeenx/nx-file-manager-utils";
import { LucideAngularModule, ChevronDown, ChevronUp } from "lucide-angular";
import { TreeItemComponent } from "../tree-item/tree-item.component";

@Component({
  selector: "nx-fm-sticky-tree-item",
  templateUrl: "./sticky-tree-item.component.html",
  standalone: true,
  imports: [LucideAngularModule, TreeItemComponent],
})
export class StickyTreeItemComponent {
  @Input()
  public file!: IFile;

  public ChevronDown = ChevronDown;
  public ChevronUp = ChevronUp;

  public onItemClick(file: IFile): void {
    file.isExpanded = !file.isExpanded;

    if (!file.isExpanded) {
      const thisStickyTreeItem = document.getElementById(
        `nx-fm-sticky-title-${file.id}`
      );

      if (thisStickyTreeItem?.parentElement) {
        thisStickyTreeItem?.classList.remove("fixed-title");
      }
    }
  }
}
