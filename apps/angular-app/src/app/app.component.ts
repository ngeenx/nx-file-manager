import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NxWelcomeComponent } from "./nx-welcome.component";

import { folderIconData, fileIconData } from "@ngeenx/nx-file-manager-icons";
import { ScrollUtils } from "@ngeenx/nx-file-manager-utils";

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  public iconSet: { [key: string]: string } = {
    folderIconData,
    fileIconData,
  };

  public onGroupContainerScroll(event: Event) {
    const scrollHeightTop = (event.target as HTMLElement).scrollTop;

    console.log(scrollHeightTop);

    const currentElement = ScrollUtils.getTopVisibleElement(event);

    let curentElementTitleId = (currentElement as HTMLElement).querySelector(
      "h2"
    )?.id;

    if (scrollHeightTop < 15) {
      curentElementTitleId = "none";
    }

    if (currentElement) {
      (event.target as HTMLElement)
        ?.querySelectorAll("h2")
        .forEach((element: Element) => {
          if (element.id === curentElementTitleId) {
            element.classList.add(
              ...[
                "sticky",
                "top-0",
                "shadow-[rgba(0,0,15,0.3)0px_5px_6px_-6px]",
              ]
            );
          } else {
            element.classList.remove("top-0");
            element.classList.remove("top-0");
            element.classList.remove(
              "shadow-[rgba(0,0,15,0.3)0px_5px_6px_-6px]"
            );
          }
        });
    }
  }
}
