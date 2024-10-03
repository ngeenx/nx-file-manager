import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

import { folderIconData, fileIconData } from "@ngeenx/nx-file-manager-icons";

import { NxAngularSidebarComponent } from "./components/sidebar/sidebar.component";

@Component({
  selector: "nx-angular-file-manager",
  standalone: true,
  imports: [CommonModule, NxAngularSidebarComponent],
  templateUrl: "./nx-angular-file-manager.component.html",
  styleUrl: "./nx-angular-file-manager.component.scss",
})
export class NxAngularFileManagerComponent {
  public iconSet: { [key: string]: string } = {
    folderIconData,
    fileIconData,
  };
}
