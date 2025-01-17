/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from "@angular/core/testing";
import { FolderTreeContextMenuService } from "./folder-tree-context-menu.service";

describe("Service: ContextMenu", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FolderTreeContextMenuService],
    });
  });

  it("should ...", inject(
    [FolderTreeContextMenuService],
    (service: FolderTreeContextMenuService) => {
      expect(service).toBeTruthy();
    }
  ));
});
