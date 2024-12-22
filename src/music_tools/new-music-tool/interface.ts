export interface IDataNewCategory {
  categoryDetails: [
    {
      name: string;
      artist: string;
      description: string;
      file: any;
      categoryId: string;
      audioFile?: any;
    }
  ];
}

export interface INewCategory {
  name: string;
  artist: string;
  description: string;
  file: any;
  category: string;
  audioFile?: any;
}
