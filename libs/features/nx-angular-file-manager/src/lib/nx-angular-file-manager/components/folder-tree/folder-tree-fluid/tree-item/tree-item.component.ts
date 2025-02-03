import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IFile } from "@ngeenx/nx-file-manager-utils";
import { ChevronRight, LucideAngularModule } from "lucide-angular";

@Component({
  selector: "nx-fm-fluid-tree-item",
  templateUrl: "./tree-item.component.html",
  standalone: true,
  imports: [LucideAngularModule],
})
export class TreeItemComponent {
  @Input()
  public file!: IFile;

  @Output()
  public fileClick = new EventEmitter<IFile>();

  public ChevronRight = ChevronRight;

  public onFileClick(): void {
    this.fileClick.emit(this.file);
  }
}
