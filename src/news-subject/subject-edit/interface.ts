export interface IFormEditSubject {
  lang: string;
  name: string;
}

export interface IDataEditSubject {
  id: number;
  subjectDetails: [
    {
      id?: number;
      lang?: string;
      name?: string;
    }
  ];
}

export interface ISubject {
  id: number;
  subjectDetails: ISubjectDetails[];
}

export interface ISubjectDetails {
  id: number;
  name: string;
  lang: string;
}
