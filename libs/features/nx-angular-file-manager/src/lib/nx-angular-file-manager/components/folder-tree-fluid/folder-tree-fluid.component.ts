import { Component, Input } from "@angular/core";
import { IFile } from "@ngeenx/nx-file-manager-utils";
import { TreeItemComponent } from "./tree-item/tree-item.component";
import { ChevronLeft, ChevronRight, LucideAngularModule } from "lucide-angular";
import { CommonModule } from "@angular/common";

@Component({
  selector: "nx-fm-folder-tree-fluid",
  templateUrl: "./folder-tree-fluid.component.html",
  standalone: true,
  imports: [TreeItemComponent, LucideAngularModule, CommonModule],
})
export class FolderTreeFluidComponent {
  @Input()
  public files!: IFile[];

  @Input()
  public height = 300;

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
