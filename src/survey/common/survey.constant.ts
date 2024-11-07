export const typeOptions = ['RADIO', 'CHECKBOX'];

export const SURVEY_TABLE_HEAD = [
  {
    id: 'id',
    label: 'ID',
    align: 'left',
  },
  {
    id: 'content',
    label: 'Tên khảo sát',
    align: 'left',
  },
  {
    id: 'point',
    label: 'Tích điểm',
    align: 'center',
  },
  {
    id: 'startDate',
    label: 'Ngày bắt đầu',
    align: 'center',
  },
  {
    id: 'endDate',
    label: 'Ngày kết thúc',
    align: 'center',
  },
  {
    id: 'status',
    label: 'Trạng thái',
    align: 'center',
  },
  {
    id: '',
  },
];

export enum IStatus {
  ACTIVE = 'ACTIVE',
  IN_ACTIVE = 'IN_ACTIVE',
}

export enum IChoose {
  SIMPLE = 'SIMPLE',
  MULTIPLE = 'MULTIPLE',
}
