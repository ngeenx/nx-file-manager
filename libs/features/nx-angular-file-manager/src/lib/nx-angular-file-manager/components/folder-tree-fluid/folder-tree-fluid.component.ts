import { Component, Input } from "@angular/core";
import { IFile } from "@ngeenx/nx-file-manager-utils";
import { TreeItemComponent } from "./tree-item/tree-item.component";
import { ChevronLeft, ChevronRight, LucideAngularModule } from "lucide-angular";

@Component({
  selector: "nx-fm-folder-tree-fluid",
  templateUrl: "./folder-tree-fluid.component.html",
  standalone: true,
  imports: [TreeItemComponent, LucideAngularModule],
})
export class FolderTreeFluidComponent {
  @Input()
  public files!: IFile[];

  public ChevronRight = ChevronRight;
  public ChevronLeft = ChevronLeft;

  public selectedFile: IFile | null = null;

  public onFileClick(file: IFile): void {
    this.selectedFile = file;
  }

  public onParentFileClick(): void {
    this.selectedFile = null;
  }
}
