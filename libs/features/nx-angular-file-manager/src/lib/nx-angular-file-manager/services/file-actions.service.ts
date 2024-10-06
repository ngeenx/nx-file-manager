import { Injectable } from "@angular/core";
import { IFile } from "@ngeenx/nx-file-manager-utils";
import { createToast, ToastOptions } from "vercel-toast";

@Injectable()
export class FileActionsService {
  public async moveFiles(files: IFile[], destination: IFile): Promise<void> {
    if (files.length === 0) {
      createToast("Please select files", <ToastOptions>{
        type: "error",
      });

      return;
    }

    const result = await new Promise((resolve) => {
      setTimeout(() => {
        console.log("move files", files, destination);

        resolve(true);
      }, 1000);
    });

    if (result) {
      createToast(`${files.length} files moved`, <ToastOptions>{
        timeout: 4000,
      });
    }
  }
}
