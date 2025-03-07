import { Component, Input, HostListener } from "@angular/core";
import { IFile } from "@ngeenx/nx-file-manager-utils";
import { FolderTreeComponent } from "../folder-tree/folder-tree-basic/folder-tree.component";
import { FolderTreeFluidComponent } from "../folder-tree/folder-tree-fluid/folder-tree-fluid.component";

@Component({
  selector: "nx-fm-sidebar",
  templateUrl: "./sidebar.component.html",
  standalone: true,
  imports: [FolderTreeComponent, FolderTreeFluidComponent],
})
export class NxAngularSidebarComponent {
  @HostListener("document:keydown", ["$event"])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (
      this.isSidebarFocused &&
      event.key === "f" &&
      (event.ctrlKey || event.metaKey)
    ) {
      // TODO: Implement sticky search input and focus it
      console.log("sidebar search", this.isSidebarFocused);
    }
  }

  @Input()
  public files!: IFile[];

  private isSidebarFocused = false;

  public onSidebarClick(): void {
    this.isSidebarFocused = true;
  }

  public onSidebarMouseLeave(): void {
    this.isSidebarFocused = false;
  }
}
