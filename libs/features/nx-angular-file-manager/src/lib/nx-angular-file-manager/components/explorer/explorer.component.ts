import { Component, Input, OnInit } from "@angular/core";
import { IFile, UrlUtils } from "@ngeenx/nx-file-manager-utils";
import SelectionArea, { SelectionEvent } from "@viselect/vanilla";

@Component({
  selector: "nx-angular-explorer",
  templateUrl: "./explorer.component.html",
  standalone: true,
})
export class ExplorerComponent implements OnInit {
  @Input()
  public iconSet!: { [key: string]: string };

  @Input()
  public files?: IFile[] = [];

  public UrlUtils: typeof UrlUtils = UrlUtils;

  public isSelecting = false;

  public ngOnInit(): void {
    this.initSelection();
  }

  private initSelection(): void {
    const selection = new SelectionArea({
      // Class for the selection-area itself (the element).
      selectionAreaClass: "selection-area",

      // Class for the selection-area container.
      selectionContainerClass: "files",

      // Query selector or dom-node to set up container for the selection-area element.
      container: "body",

      // document object - if you want to use it within an embed document (or iframe).
      // If you're inside of a shadow-dom make sure to specify the shadow root here.
      document: window.document,

      // Query selectors for elements which can be selected.
      selectables: [".file"],

      // Query selectors for elements from where a selection can be started from.
      startAreas: [".files"],

      // Query selectors for elements which will be used as boundaries for the selection.
      // The boundary will also be the scrollable container if this is the case.
      boundaries: [".files"],

      // Behaviour related options.
      behaviour: {
        // Specifies what should be done if already selected elements get selected again.
        //   invert: Invert selection for elements which were already selected
        //   keep: Keep selected elements (use clearSelection() to remove those)
        //   drop: Remove stored elements after they have been touched
        overlap: "invert",

        // On which point an element should be selected.
        // Available modes are cover (cover the entire element), center (touch the center) or
        // the default mode is touch (just touching it).
        intersect: "touch",

        // px, how many pixels the point should move before starting the selection (combined distance).
        // Or specifiy the threshold for each axis by passing an object like {x: <number>, y: <number>}.
        startThreshold: 10,

        // List of triggers that should cause the selection to begin.
        // Each element in the list can be one of the following
        //      - a MouseButton (numbers 0 through 4)
        //        see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#value
        //      - an object of shape { button: MouseButton, modifiers: Modifier[] }
        //        where a Modifier is ( 'ctrl' | 'meta' | 'alt' | 'shift' )
        //
        // To trigger the selection with e.g. <CTRL + SHIFT + LEFT-CLICK> OR <RIGHT-CLICK> the
        // trigger property should look like
        //
        // triggers: [ { button: 0, modifiers: [ "ctrl", "shift" ] }, 2 ]
        //
        // The default value is [0], enabling only the main mouse button (usually left click).
        // On mac the ctrl will act as the meta key.
        triggers: [0],

        // Scroll configuration.
        scrolling: {
          // On scrollable areas the number on px per frame is devided by this amount.
          // Default is 10 to provide a enjoyable scroll experience.
          speedDivider: 10,

          // Browsers handle mouse-wheel events differently, this number will be used as
          // numerator to calculate the mount of px while scrolling manually: manualScrollSpeed / scrollSpeedDivider.
          manualSpeed: 750,

          // This property defines the virtual inset margins from the borders of the container
          // component that, when crossed by the mouse/touch, trigger the scrolling. Useful for
          // fullscreen containers.
          startScrollMargins: { x: 0, y: 0 },
        },
      },

      // Features.
      features: {
        // Enable / disable touch support.
        touch: true,

        // Range selection.
        range: true,

        // De-select all if user clicks clicks outside selectables.
        // Disabled by default because it is not possible to reliably detect if the user clicked on a scrollbar.
        deselectOnBlur: false,

        // Configuration in case a selectable gets just clicked.
        singleTap: {
          // Enable single-click selection (Also disables range-selection via shift + ctrl).
          allow: true,

          // 'native' (element was mouse-event target) or 'touch' (element visually touched).
          intersect: "native",
        },
      },
    });

    selection
      .on("beforestart", (event: SelectionEvent) => {
        if (
          (
            event.event?.target as HTMLElement
          )?.parentElement?.classList?.contains("file")
        ) {
          this.isSelecting = false;

          return false;
        }

        // this.files?.forEach((file: IFile) => {
        //   file.isSelected = false;

        //   return file;
        // });

        this.isSelecting = true;

        return true;
      })
      .on("beforedrag", (event: SelectionEvent) => {
        if (
          (
            event.event?.target as HTMLElement
          )?.parentElement?.classList?.contains("file")
        ) {
          this.isSelecting = false;

          return false;
        }

        return true;
        // Same as 'beforestart' but before a selection via dragging happens.
        // console.log("beforedrag", evt);
      })
      .on("start", (evt) => {
        // A selection got initiated, you could now clear the previous selection or
        // keep it if in case of multi-selection.
        console.log("start", evt);
      })
      .on("move", (evt) => {
        // Here you can update elements based on their state.
        console.log("move", evt);
      })
      .on("stop", (event: SelectionEvent) => {
        console.log("stop", event);
        const selectedFileIds: string[] = event.store.selected?.map(
          (fileElement: Element) => fileElement.id
        );

        this.files?.forEach((file: IFile) => {
          return (file.isSelected = selectedFileIds?.includes(
            file.id.toString()
          ));
        });

        this.isSelecting = false;
      });
  }

  public onFilesAreaClick(event: Event): void {
    const classList = Array.from((event.target as HTMLElement).classList || []),
      excludedClasses = ["files", "file"];

    // if classList is not empty and contains any of the excluded classes, it means
    // that the click happened on a file or a group of files.
    if (
      classList &&
      classList.some((item: string) => excludedClasses.includes(item))
    ) {
      this.isSelecting = false;
    }
  }
}
