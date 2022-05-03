export interface Field {
  key: string;
  name: string;
}

export interface BlobInfo {
  id: () => string;
  name: () => string;
  filename: () => string;
  blob: () => Blob;
  base64: () => string;
  blobUri: () => string;
  uri: () => string | undefined;
}

export type UploadHandler = (
  blobInfo: BlobInfo,
  success: (url: string) => void,
  failure: (err: string, options?: any) => void,
  progress?: (percent: number) => void,
) => Promise<string>;

export type Mode = 'normal' | 'auction' | 'preview';
