import { Component, Input, AfterViewInit } from "@angular/core";
import {
  ISidebarGroup,
  ScrollPosition,
  ScrollUtils,
} from "@ngeenx/nx-file-manager-utils";

@Component({
  selector: "nx-angular-sidebar",
  templateUrl: "./sidebar.component.html",
  standalone: true,
})
export class NxAngularSidebarComponent implements AfterViewInit {
  @Input()
  public iconSet!: { [key: string]: string };

  @Input()
  public sidebarGroups!: ISidebarGroup[];

  public hasScrollableArea = false;
  public groupScrollPosition: ScrollPosition = ScrollPosition.MIDDLE;
  public ScrollPosition: typeof ScrollPosition = ScrollPosition;

  public ngAfterViewInit() {
    this.checkHasScroll();
  }

  public onGroupContainerScroll(event: Event): void {
    if (event.target) {
      this.groupScrollPosition = ScrollUtils.isScrollbarClosestTo(
        event.target as HTMLElement,
        15
      );
    }

    const scrollHeightTop = (event.target as HTMLElement).scrollTop,
      currentElement = ScrollUtils.getTopVisibleElement(event);

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
            element.classList.add("fixed-title");
          } else {
            element.classList.remove("fixed-title");
          }
        });
    }
  }

  private checkHasScroll(): void {
    const groupContainer = document.getElementById("group-container");

    if (groupContainer) {
      this.hasScrollableArea = ScrollUtils.hasScrollbar(groupContainer);
    }
  }
}
