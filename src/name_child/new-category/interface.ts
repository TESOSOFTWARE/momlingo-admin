export interface IDataNewCategory {
  categoryDetails: [
    {
      lang: string;
      desc: string;
      name: string;
      slug?: string;
      gender?: string;
      meaning?: string;
    }
  ];
}

export interface INewCategory {
  lang: string;
  desc: string;
  name: string;
  slug?: string;
  gender?: string;
  meaning?: string;
}
