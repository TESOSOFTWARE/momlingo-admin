export interface IInitialState {
  selectedItem: undefined | number;
  fileImage: IUploadedFile | null;
}
export interface IUploadFile {
  path: string;
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
  lastModifiedDate: string;
}
export interface IUploadedFile {
  createdAt: string;
  deletedAt: null | string;
  id: number;
  key: string;
  size: number;
  uploaderId: number;
  url: string;
  version: number;
}
