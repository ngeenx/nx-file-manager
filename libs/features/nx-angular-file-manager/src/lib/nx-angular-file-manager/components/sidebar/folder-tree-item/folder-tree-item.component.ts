import { Component, Input, OnInit } from "@angular/core";
import { IFile, IFileGroup } from "@ngeenx/nx-file-manager-utils";
import { ChevronDown, ChevronUp, LucideAngularModule } from "lucide-angular";

@Component({
  selector: "nx-fm-folder-tree-item",
  templateUrl: "./folder-tree-item.component.html",
  standalone: true,
  imports: [LucideAngularModule],
})
export class NxFolderTreeItemComponent implements OnInit {
  @Input()
  public files!: IFile[] | undefined | null;

  public ChevronDown = ChevronDown;
  public ChevronUp = ChevronUp;

  constructor() {}

  ngOnInit() {}

  public onFileClick(file: IFile): void {
    file.isExpanded = !file.isExpanded;
  }
}
