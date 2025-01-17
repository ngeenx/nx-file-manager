import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import { IFile, IFileGroup } from "@ngeenx/nx-file-manager-utils";
import { FolderTreeComponent } from "../folder-tree/folder-tree.component";

@Component({
  selector: "nx-fm-sidebar",
  templateUrl: "./sidebar.component.html",
  standalone: true,
  imports: [FolderTreeComponent],
})
export class NxAngularSidebarComponent {
  @Input()
  public files!: IFile[];
}
