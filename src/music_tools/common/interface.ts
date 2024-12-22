export interface ICallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}

export interface IParamsListCategories {
  page?: number;
  limit?: number;
  currentPage?: number;
  lan?: string;
  gender?: string;
  fullName?: string;
}

export interface ICategories {
  id: number;
  categoryDetails: ICategoryDetails[];
}

export interface ICategoryDetails {
  id: number;
  lang: string;
  desc: string;
  name: string;
  slug: string;
}

export interface IResListCategories {
  items: ICategories[];
  meta: {
    totalItems?: number;
    itemCount?: number;
    itemsPerPage?: number;
    totalPages?: number;
    currentPage?: number;
  };
}

export type ICategoryTableProps = {
  row: ICategories | any;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
};

export interface IParamsDeleteCategory {
  ids: number[];
}

export interface IDataEditCategory {
  id: number;
  categoryDetails: [
    {
      id: number;
      lang: string;
      desc: string;
      name: string;
      slug: string;
    }
  ];
}
export interface IFormEditCategory {
  description: string;
  artist: string;
  name: string;
  fileUrl?: any;
  audioFile?: any;
}
