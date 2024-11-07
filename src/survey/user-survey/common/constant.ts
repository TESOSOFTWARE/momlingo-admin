export const USER_SURVEY_TABLE_HEAD = [
  {
    id: 'id',
    label: 'ID',
    align: 'left',
  },
  {
    id: 'name',
    label: 'Họ và tên',
    align: 'left',
  },
  {
    id: 'phoneNumber',
    label: 'Số điện thoại',
    align: 'center',
  },
  {
    id: 'actionDate',
    label: 'Ngày thực hiện',
    align: 'center',
  },
  {
    id: '',
  },
];

export const MOCK_USER_SURVEY = {
  items: [
    {
      id: 1,
      phoneNumber: '+84342970934',
      name: 'manh dep trai',
      actionDate: new Date().toISOString(),
    },
    {
      id: 2,
      phoneNumber: '+84342000934',
      name: 'manh dep trai 1',
      actionDate: new Date().toISOString(),
    },
    {
      id: 10,
      phoneNumber: '+84342974387',
      name: 'manh dep trai 2',
      actionDate: new Date().toISOString(),
    },
    {
      id: 17,
      phoneNumber: '+84758275639',
      name: 'manh dep trai 3',
      actionDate: new Date().toISOString(),
    },
    {
      id: 19,
      phoneNumber: '+84184629576',
      name: 'manh dep trai 4',
      actionDate: new Date().toISOString(),
    },
  ],
  meta: {
    totalItems: 5,
    itemCount: 5,
    itemsPerPage: 20,
    totalPages: 1,
    currentPage: 1,
  },
};
