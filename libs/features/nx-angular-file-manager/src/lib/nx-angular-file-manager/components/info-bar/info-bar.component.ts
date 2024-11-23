import { Component, Input, OnInit } from "@angular/core";
import { IFile } from "@ngeenx/nx-file-manager-utils";

@Component({
  selector: "nx-angular-info-bar",
  templateUrl: "./info-bar.component.html",
  standalone: true,
})
export class NxFileInfoBarComponent implements OnInit {
  @Input()
  public files: IFile[] = [];

  constructor() {}

  ngOnInit() {}
}
