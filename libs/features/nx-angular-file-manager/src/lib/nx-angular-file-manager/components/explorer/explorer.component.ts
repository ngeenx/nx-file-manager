import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  SimpleChanges,
  OnChanges,
  OnDestroy,
} from "@angular/core";
import { FileType, IFile, ITab, UrlUtils } from "@ngeenx/nx-file-manager-utils";
import SelectionArea, { SelectionEvent } from "@viselect/vanilla";
import { timer } from "rxjs";
import { FileActionsService } from "../../services/file-actions.service";
import { createToast, ToastOptions } from "vercel-toast";
import tippy, { Instance, Props } from "tippy.js";

@Component({
  selector: "nx-angular-explorer",
  templateUrl: "./explorer.component.html",
  standalone: true,
  providers: [FileActionsService],
})
export class ExplorerComponent implements AfterViewInit, OnChanges, OnDestroy {
  // #region ViewChilds and HostListeners

  @HostListener("document:keydown", ["$event"])
  private onKeydownHandler(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      this.clearAllSelections();
    }
  }

  @ViewChild("dragGhost", { static: true })
  public dragGhost: ElementRef | undefined;

  @ViewChild("filesContainer", { static: true })
  public filesContainer: ElementRef | undefined;

  // #endregion

  // #region Inputs

  @Input()
  public iconSet!: { [key: string]: string };

  @Input()
  public isFreezed = true;

  @Input()
  public tabData!: ITab;

  // #endregion

  public UrlUtils: typeof UrlUtils = UrlUtils;
  public isSelecting = false;
  public selectedFiles: IFile[] = [];
  public isFileDragging = false;

  private selection: SelectionArea | undefined;
  private tippyInstance: Instance<Props>[] | undefined;

  public constructor(private fileActionsService: FileActionsService) {}

  public ngAfterViewInit(): void {
    this.tippyInstance = tippy("[data-tippy-content]", {
      delay: [1000, 100],
      arrow: false,
      placement: "bottom",
      hideOnClick: true,
      offset: [0, 5],
      maxWidth: 300,
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["isFreezed"]) {
      if (!changes["isFreezed"]?.currentValue) {
        this.clearAllSelections();
        this.removeSelection();
      } else {
        this.initSelection();
      }
    }
  }

  /**
   * Initialize the selection area.
   *
   * This method initializes the selection area by creating a new instance of the
   * SelectionArea class and setting up the necessary event listeners.
   *
   * The selection area is configured to select elements with the class "file"
   * when the user clicks and drags the mouse over them. The selection area is
   * also configured to automatically select the parent element of the element
   * that the user clicks on, if the element is not already selected.
   *
   * The selection area is also configured to trigger the selection when the user
   * clicks on the "files" container, and to trigger the selection when the user
   * touches the "files" container on a touch device.
   *
   * The selection area is configured to scroll the container when the user drags
   * the selection area over the edges of the container.
   *
   * The selection area is also configured to clear all selections when the user
   * clicks outside of the selection area.
   */
  private initSelection(): void {
    this.selection = new SelectionArea({
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

    const isTargetElementFile = (event: SelectionEvent): boolean =>
      (event.event?.target as HTMLElement)?.parentElement?.classList?.contains(
        "file"
      ) ||
      (event.event?.target as HTMLElement)?.classList?.contains("file") ||
      false;

    this.selection
      .on("beforestart", (event: SelectionEvent) => {
        if (isTargetElementFile(event) || this.isFileDragging) {
          this.isSelecting = false;

          return false;
        }

        console.log("BEFORESTART");

        this.clearAllSelections(event.event);

        this.isSelecting = true;

        return true;
      })
      .on("beforedrag", (event: SelectionEvent) => {
        if (isTargetElementFile(event)) {
          this.isSelecting = false;

          return false;
        }

        this.isSelecting = true;

        return true;
      })
      .on("start", (event: SelectionEvent) => {
        console.log("start", event);
      })
      .on("move", (event: SelectionEvent) => {
        this.isSelecting = true;

        const selectedFileIds: string[] = event.store.selected?.map(
          (fileElement: Element) => fileElement.id
        );

        this.tabData.files?.forEach((file: IFile) => {
          if (selectedFileIds?.includes(file.id.toString())) {
            file.isSelected = true;
          }
        });

        const removedFileIds: string[] = event.store.changed?.removed
          ?.map((fileElement: Element) => fileElement.id)
          .filter((fileId: string) => !selectedFileIds?.includes(fileId));

        this.tabData.files?.forEach((file: IFile) => {
          if (removedFileIds?.includes(file.id.toString())) {
            file.isSelected = false;
          }
        });
      })
      .on("stop", (event: SelectionEvent) => {
        const selectedFileIds: string[] = event.store.selected?.map(
          (fileElement: Element) => fileElement.id
        );

        this.tabData.files?.forEach((file: IFile) => {
          return (file.isSelected = selectedFileIds?.includes(
            file.id.toString()
          ));
        });

        console.log("STOP");

        this.checkUnavailableFiles();

        timer(500).subscribe(() => {
          this.isSelecting = false;
        });
      });
  }

  private removeSelection(): void {
    this.selection?.destroy();
  }

  /**
   * Called when the user clicks on the files area.
   * If the click was on the files area and not on a file, and the user did not
   * hold the Ctrl key, then clear all selections.
   * @param event
   */
  public onFilesAreaClick(event: MouseEvent): void {
    if (
      (event.target as HTMLElement).classList?.contains("files") &&
      (!event.ctrlKey || !event.metaKey)
    ) {
      console.log("onFilesAreaClick", event);
      this.clearAllSelections(event);
    }
  }

  /**
   * Called when the user clicks on a file.
   * If the user held the Ctrl key while clicking, then toggle the file's
   * selection state.
   * @param event
   * @param file
   */
  public onFileClick(event: MouseEvent, file: IFile): void {
    if (event.ctrlKey || event.metaKey) {
      file.isSelected = !file.isSelected;

      this.checkUnavailableFiles();
    }
  }

  // #region File DND

  public onFileDragStart(event: DragEvent, file: IFile): void {
    if (!file.isSelected) {
      if (this.selectedFiles.length > 0) {
        event.preventDefault();

        this.dragGhost?.nativeElement?.classList?.remove("dragging");

        return;
      } else {
        file.isSelected = true;

        this.selectedFiles.push(file);
      }
    }

    if (event.dataTransfer) {
      event.dataTransfer.setDragImage(this.dragGhost?.nativeElement, 0, 0);
      event.dataTransfer.effectAllowed = "copyMove";
    }

    const dragGhostElement = this.dragGhost?.nativeElement;
    dragGhostElement?.classList?.add("dragging");

    timer(300).subscribe(() => {
      this.tippyInstance?.forEach((tippyInstance: Instance) => {
        tippyInstance.disable();
      });
    });

    this.isFileDragging = true;
  }

  public onFileDragging(event: DragEvent): void {
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "copyMove";
    }

    this.updateGhostPosition(event);
  }

  public onFileDragEnd(event: DragEvent): void {
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "copy";
    }

    this.dragGhost?.nativeElement?.classList?.remove("dragging");

    timer(300).subscribe(() => {
      this.tippyInstance?.forEach((tippyInstance: Instance) => {
        tippyInstance.enable();
      });
    });

    this.isFileDragging = false;
  }

  public onFileDragOver(event: DragEvent, file: IFile): void {
    event.preventDefault();

    if (this.selectedFiles.length > 0 && !this.selectedFiles.includes(file)) {
      file.isDroppable = true;
      file.isDropAllowed = file.type === FileType.FOLDER;
    }
  }

  public onFileDropLeave(event: DragEvent, file: IFile): void {
    event.preventDefault();

    file.isDroppable = false;
  }

  public async onFileDrop(event: DragEvent, file: IFile): Promise<void> {
    event.preventDefault();

    file.isDroppable = false;

    if (file.type !== FileType.FOLDER) {
      createToast("You select only folders for moving", <ToastOptions>{
        timeout: 3000,
        type: "error",
      });

      return;
    }

    if (this.selectedFiles.length > 0 && !this.selectedFiles.includes(file)) {
      createToast("Files moving...", <ToastOptions>{
        timeout: 1500,
      });

      await this.fileActionsService.moveFiles(this.selectedFiles, file);

      this.checkUnavailableFiles();

      this.tabData.files = this.tabData.files?.filter(
        (file: IFile) => !file.isSelected
      );

      this.clearAllSelections();
    }
  }

  /**
   * Update the position of the drag ghost element.
   * This method is called when the user drags a file.
   * It updates the position of the drag ghost element so that it is
   * positioned at the correct location on the page.
   * @param event
   */
  private updateGhostPosition(event: MouseEvent): void {
    // TODO: remove if not needed
    return;
    const dragGhostElement = this.dragGhost?.nativeElement,
      filesContainerRect =
        this.filesContainer?.nativeElement?.getBoundingClientRect(),
      scrollTop = this.filesContainer?.nativeElement?.scrollTop,
      scrollLeft = this.filesContainer?.nativeElement?.scrollLeft;

    if (dragGhostElement) {
      dragGhostElement.style.left =
        event.pageX - filesContainerRect.left + scrollLeft + "px";
      dragGhostElement.style.top =
        event.pageY - filesContainerRect.top + scrollTop + "px";
    }
  }

  // #endregion

  // #region Helpers

  /**
   * When selecting files, this method is called to determine which files are unavailable to drop (i.e. not a folder, and not in the list of selected files).
   *
   * The method iterates over the list of files and marks each file as unavailable if it is not a folder and not in the list of selected files.
   * If there are no selected files, it clears the `isDropUnavailable` flag for all files.
   */
  private checkUnavailableFiles(): void {
    this.selectedFiles =
      this.tabData.files?.filter((file: IFile) => file.isSelected) || [];

    const selectedFileIds: string[] = this.selectedFiles?.map((file: IFile) =>
      file.id.toString()
    );

    if (this.selectedFiles.length > 0) {
      this.tabData.files?.forEach((file: IFile) => {
        file.isDropUnavailable =
          file.type !== FileType.FOLDER &&
          !selectedFileIds?.includes(file.id.toString());
      });
    }
  }

  private clearAllSelections(
    mouseEvent: MouseEvent | TouchEvent | null | undefined = undefined
  ): void {
    if (mouseEvent && (mouseEvent.ctrlKey || mouseEvent.metaKey)) {
      return;
    }

    if (!this.isSelecting && this.selectedFiles.length) {
      console.log("CLEARALL");
      this.isSelecting = false;
      this.selection?.clearSelection();
      this.selectedFiles = [];

      this.tabData.files?.forEach((file: IFile) => {
        file.isSelected = false;
        file.isDroppable = false;
        file.isDropUnavailable = false;
      });
    }
  }

  // #endregion

  public ngOnDestroy(): void {
    this.clearAllSelections();
    this.removeSelection();
  }
}
