export interface IDataNewCategory {
  categoryDetails: [
    {
      lang: string;
      desc: string;
      name: string;
      slug: string;
    }
  ];
}

export interface INewCategory {
  lang: string;
  desc: string;
  name: string;
  slug: string;
}
