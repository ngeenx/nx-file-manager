import { Component, Input } from "@angular/core";
import { IFile } from "@ngeenx/nx-file-manager-utils";

@Component({
  selector: "nx-angular-explorer",
  templateUrl: "./explorer.component.html",
  standalone: true,
})
export class ExplorerComponent {
  @Input()
  public iconSet!: { [key: string]: string };

  @Input()
  public files?: IFile[] = [];
}
