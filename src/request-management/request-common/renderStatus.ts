export const renderStatus = (value: string) => {
  if (value === 'SUCCESS') {
    return 'Đã được chấp thuận';
  }
  if (value === 'WAITING_APPROVE') {
    return 'Chờ chấp thuận';
  }
  if (value === 'REJECTED') {
    return 'Đã bị từ chối';
  }
};

export const renderActive = (value: boolean) => {
  if (value === true) {
    return 'Đang hoạt động';
  } else return 'Không hoạt động';
};
