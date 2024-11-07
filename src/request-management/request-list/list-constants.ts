import { IFilterOption } from '../../winning-history/interface';
import { IFormRequest, IstatusListRequest } from './list-interface';

export const HEAD_TABLE_PROPS = [
  {
    id: 'file',
    label: 'Tên file',
    align: 'left',
  },
  {
    id: 'browseDate',
    label: 'Ngày chấp thuận',
    align: 'left',
  },
  {
    id: 'sku',
    label: 'Loại',
    align: 'left',
  },
  {
    id: 'weight',
    label: 'Cân nặng',
    align: 'left',
  },
  {
    id: 'quantity',
    label: 'Số lượng mã',
    align: 'left',
  },
  {
    id: 'status',
    label: 'Trạng thái',
    align: 'left',
  },
  {
    id: 'factoryName',
    label: 'Nhóm sản phẩm',
    align: 'center',
  },

  {
    label: '',
    align: 'left',
  },
];

export const HEAD_TABLE_PROPS_APPROVE_USER = [
  {
    id: 'id',
    label: 'ID',
    align: 'left',
  },
  {
    id: 'createdAt',
    label: 'Ngày yêu cầu',
    align: 'left',
  },
  {
    id: 'name',
    label: 'Tên agent',
    align: 'left',
  },
  {
    id: 'email',
    label: 'Email',
    align: 'left',
  },
  {
    id: 'phoneNumber',
    label: 'Số điện thoại',
    align: 'left',
  },
  {
    id: 'rejectDescription',
    label: 'Lý do từ chối',
    align: 'left',
  },
  {
    label: 'Tùy chọn',
    align: 'center',
  },
];
export const defaultValueSearch = {
  name: null,
  startDate: null,
  endDate: null,
  type: null,
  productGroup: null,
  status: null,
  code: null,
};
export const filterOptions: IFilterOption[] = [
  {
    label: '',
    value: '',
  },
  {
    label: 'SPOON',
    value: 'SPOON',
  },
  {
    label: 'SBPS',
    value: 'SBPS',
  },
];
export const filterOptionsStatus: IFilterOption[] = [
  {
    label: '',
    value: '',
  },
  {
    label: 'Chờ duyệt file',
    value: 'WAITING_APPROVE',
  },
  {
    label: 'Đang tạo mã',
    value: 'CREATING_CODE',
  },
  {
    label: 'Thành công',
    value: 'SUCCESS',
  },
  {
    label: 'Lỗi',
    value: 'ERROR',
  },
  {
    label: 'Từ chối duyệt',
    value: 'REJECTED',
  },
];

export const statusListRequest: IstatusListRequest = {
  WAITING_APPROVE: 'Chờ duyệt file',
  CREATING_CODE: 'Đang tạo mã',
  SUCCESS: 'Thành công',
  ERROR: 'Lỗi',
  REJECTED: 'Từ chối duyệt',
};

export const statusColorRequest: IstatusListRequest = {
  WAITING_APPROVE: '#F0997D',
  CREATING_CODE: '#3E54AC',
  SUCCESS: '#03C988',
  ERROR: '#F55050',
  REJECTED: '#FF0303',
};

export const defaultValueFile: IFormRequest = {
  id: 0,
  name: '',
  approvedDate: '',
  addPointCodeQuantity: 0,
  status: '',
  codeQuantityCreated: 0,
  rejectDescription: null,
  productGroup: '',
  type: '',
  description: '',
  weight: 0,
  manufactureDate: '',
  isAcitve: false,
  accRequestId: 0,
  nameUserRequest: '',
  accApproveId: 0,
  createdAt: '',
  updatedAt: '',
  deletedAt: null,
  version: 0,
};
