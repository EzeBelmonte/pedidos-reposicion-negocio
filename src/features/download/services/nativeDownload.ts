import { registerPlugin } from "@capacitor/core";

interface NativeDownloadPlugin {
  saveToDownloads(options: {
    fileName: string;
    data: string;
  }): Promise<{
    uri: string;
  }>;
}

export const NativeDownload =
  registerPlugin<NativeDownloadPlugin>("NativeDownload");