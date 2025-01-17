import { Component, Input } from "@angular/core";
import { IFile } from "@ngeenx/nx-file-manager-utils";
import { ChevronRight, ChevronDown, LucideAngularModule } from "lucide-angular";

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

  public onItemClick(file: IFile): void {
    file.isExpanded = !file.isExpanded;
  }
}
