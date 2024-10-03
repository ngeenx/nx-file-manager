import { Component, Input, AfterViewInit } from "@angular/core";
import { ScrollPosition, ScrollUtils } from "@ngeenx/nx-file-manager-utils";

@Component({
  selector: "nx-angular-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  standalone: true,
})
export class NxAngularSidebarComponent implements AfterViewInit {
  @Input()
  public iconSet!: { [key: string]: string };

  public hasScrollableArea = false;
  public sidebarGroupScrollPosition: ScrollPosition = ScrollPosition.MIDDLE;
  public ScrollPosition: typeof ScrollPosition = ScrollPosition;

  public ngAfterViewInit() {
    this.checkHasScroll();
  }

  private checkHasScroll(): void {
    const groupContainer = document.getElementById("group-container");

    if (groupContainer) {
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
            element.classList.add("fixed-title");
          } else {
            element.classList.remove("fixed-title");
          }
        });
    }
  }
}
