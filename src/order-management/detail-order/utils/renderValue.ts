export const rederTotalDiscount = (value: number) => {
  if (value === 0) return 'Không giảm giá';
};

export const renderShippingTotal = (value: number) => {
  if (value === 0) return 'Freeship';
};
