import { AfterViewInit, Component } from "@angular/core";
import { CommonModule } from "@angular/common";

import { folderIconData, fileIconData } from "@ngeenx/nx-file-manager-icons";
import { ScrollPosition, ScrollUtils } from "@ngeenx/nx-file-manager-utils";

@Component({
  selector: "nx-angular-file-manager",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./nx-angular-file-manager.component.html",
  styleUrl: "./nx-angular-file-manager.component.scss",
})
export class NxAngularFileManagerComponent implements AfterViewInit {
  public iconSet: { [key: string]: string } = {
    folderIconData,
    fileIconData,
  };

  public hasScrollableArea = false;
  public sidebarGroupScrollPosition: ScrollPosition = ScrollPosition.MIDDLE;
  public ScrollPosition: typeof ScrollPosition = ScrollPosition;

  public ngAfterViewInit() {
    const groupContainer = document.getElementById("group-container");

    if (groupContainer) {
      console.log(groupContainer, ScrollUtils.hasScrollbar(groupContainer));
      this.hasScrollableArea = ScrollUtils.hasScrollbar(groupContainer);
    }
  }

  public onGroupContainerScroll(event: Event) {
    if (event.target) {
      this.sidebarGroupScrollPosition = ScrollUtils.isScrollbarClosestTo(
        event.target as HTMLElement,
        15
      );
    }

    const scrollHeightTop = (event.target as HTMLElement).scrollTop,
      scrollHeightBottom =
        (event.target as HTMLElement).scrollTop -
        (event.target as HTMLElement).scrollHeight,
      currentElement = ScrollUtils.getTopVisibleElement(event);

    let curentElementTitleId = (currentElement as HTMLElement).querySelector(
      "h2"
    )?.id;

    console.log(
      scrollHeightBottom,
      (event.target as HTMLElement).scrollTop,
      (event.target as HTMLElement).scrollHeight
    );

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
