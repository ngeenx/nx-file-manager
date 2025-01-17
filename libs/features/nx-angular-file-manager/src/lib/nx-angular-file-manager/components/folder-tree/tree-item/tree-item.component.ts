import { Component, Input } from "@angular/core";
import { IFile } from "@ngeenx/nx-file-manager-utils";
import { ChevronDown, ChevronUp, LucideAngularModule } from "lucide-angular";

@Component({
  selector: "nx-fm-tree-item",
  templateUrl: "./tree-item.component.html",
  standalone: true,
  imports: [LucideAngularModule],
})
export class TreeItemComponent {
  @Input()
  public file!: IFile;

  public ChevronDown = ChevronDown;
  public ChevronUp = ChevronUp;

  public onFileClick(file: IFile): void {
    file.isExpanded = !file.isExpanded;
  }
}
