import { Injectable } from "@angular/core";
import { IFile } from "@ngeenx/nx-file-manager-utils";
import * as async from "async";

@Injectable({
  providedIn: "root",
})
export class FileUploaderService {
  private readonly concurrencyLimit = 5;

  private readonly uploadQueue: async.AsyncPriorityQueue<IFile> =
    async.priorityQueue(this.uploadFile.bind(this), this.concurrencyLimit);

  constructor() {
    this.uploadQueue.drain(() => {
      console.log("All files have been uploaded.");
    });
  }

  private uploadFile(file: IFile, callback: (err?: unknown) => void) {
    file.isUploading = true;
    file.isUploadingFailed = false;
    file.isUploadingSuccess = false;

    console.log(`Uploading file: ${file.name}`);

    setTimeout(() => {
      const success = Math.random() > 0.1;

      if (success) {
        file.isUploadingSuccess = true;
        file.isUploadingFailed = false;
        file.isReadyForUpload = false;
        console.log(`Successfully uploaded: ${file.name}`);
      } else {
        file.isUploadingSuccess = false;
        file.isUploadingFailed = true;
        file.isReadyForUpload = false;
        console.log(`Failed to upload: ${file.name}`);
      }

      file.isUploading = false;
      callback(success ? null : new Error("Upload failed"));
    }, Math.random() * 3456);
  }

  public addFileToQueue(file: IFile, priority = 1) {
    file.isUploading = false;
    file.isUploadingFailed = false;
    file.isUploadingSuccess = false;

    this.uploadQueue.push(file, priority, (err?: unknown) => {
      if (err) {
        console.error(`Error uploading file: ${file.name}`, err);
      }
    });
  }

  public changeFilePriority(file: IFile, newPriority: number) {
    console.log(`Changing priority of ${file.name} to ${newPriority}`);

    this.uploadQueue.remove((node) => node.data.id === file.id);
    this.addFileToQueue(file, newPriority);
  }

  public isQueueRunning(): boolean {
    return this.uploadQueue.running() > 0;
  }

  public getPendingFilesCount(): number {
    return this.uploadQueue.length();
  }

  public cancelUpload(file: IFile) {
    this.uploadQueue.remove((node) => node.data.id === file.id);
    file.isUploading = false;
    file.isUploadingFailed = false;
    file.isUploadingSuccess = false;
    file.isReadyForUpload = false;
    console.log(`Upload canceled for: ${file.name}`);
  }
}
