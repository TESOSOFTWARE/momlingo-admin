import * as Yup from 'yup';

export const CodeListSchema = Yup.object().shape({
  searchText: Yup.string(),
  searchType: Yup.mixed(),
  createdAt: Yup.string().nullable(),
  status: Yup.string(),
});
