export const OrderStatusLabel = [
  { label: 'Processing', value: 'PROCESSING', color: '#2EA9FF' },
  { label: 'On Hold', value: 'ON_HOLD', color: '#7975A9' },
  { label: 'Completed', value: 'COMPLETED', color: '#00AB55' },
  { label: 'Cancelled', value: 'CANCELLED', color: '#FF9CB5' },
];

export const DEFAULT_ADDRESS = {
  // province: {
  //   id: 0,
  //   name: '',
  //   type: '',
  //   parentId: 0,
  // },
  // district: {
  //   id: 0,
  //   name: '',
  //   type: '',
  //   parentId: 0,
  // },
  // ward: {
  //   id: 0,
  //   name: '',
  //   type: '',
  //   parentId: 0,
  // },
  province: undefined,
  district: undefined,
  ward: undefined,
  address1: '',
}

export const DEFAULT_EDIT_ORDER ={
  id: 0,
  createAt: '',
  phone: '',
  status: '',
  name: '',
  fullAddress: '',

}