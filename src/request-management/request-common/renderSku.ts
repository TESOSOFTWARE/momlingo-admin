export const renderSku = (sku: string) => {
  const obj = listSku.find((item) => {
    return item.value === sku;
  });
  return `${obj?.value} - ${obj?.label}`;
};

const listSku = [
  { value: 'VMSBPS30', label: 'SBPS ColosBaby Gold 110ml' },
  { value: 'VMSBPS31', label: 'SBPS ColosBaby Gold 180ml' },
  { value: 'VMSBPS22', label: 'SBPS ColosBaby IQ Gold 110ml' },
  { value: 'VMSBPS23', label: 'SBPS ColosBaby IQ Gold 180ml' },
  { value: 'VMSBPS34', label: 'SBPS ColosBaby Bio Gold 110ml' },
  { value: 'VMSBPS35', label: 'SBPS ColosBaby Bio Gold 180ml' },
  { value: 'VMSBPS20', label: 'SBPS Oggi Suy Dinh Dưỡng Gold 110ml' },
  { value: 'VMSBPS21', label: 'SBPS Oggi Suy Dinh Dưỡng Gold 180ml' },
  { value: 'VMSBPS24', label: 'SBPS OGGI 1+ Vani 110ml' },
  { value: 'VMSBPS25', label: 'SBPS OGGI 1+ Vani 180ml' },
  { value: 'VMSBPS26', label: 'SBPS OGGI 1+ Váng Sữa 110ml' },
  { value: 'VMSBPS27', label: 'SBPS OGGI 1+ Váng Sữa 180ml' },
  { value: 'VMSBPS28', label: 'SBPS Colos Gain 110ml' },
  { value: 'VMSBPS29', label: 'SBPS Colos Gain 180ml' },
  { value: 'VMSBPS32', label: 'SBPS Colos Opti 110ml' },
  { value: 'VMSBPS33', label: 'SBPS Colos Opti 180ml' },
  { value: 'VMSBPS36', label: 'SBPS Colos DHA+ 110ml' },
  { value: 'VMSBPS37', label: 'SBPS Colos DHA+ 180ml' },
  { value: 'VNSBPS03', label: 'SBPS Calokid Gold 110ml' },
  { value: 'VNSBPS04', label: 'SBPS Calokid Gold 180ml' },
  { value: 'VNSBPS01', label: 'SBPS VitaGrow 110ml' },
  { value: 'VNSBPS02', label: 'SBPS VitaGrow 110ml' },
];
