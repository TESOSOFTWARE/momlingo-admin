import { Chip } from '@mui/material';
import Iconify from '../../../common/components/Iconify';
type tagProp = {
  labelProp: string;
  colorChip?: string;
};

export function ChipTag({ labelProp, colorChip }: tagProp) {
  return (
    <Chip
      icon={<Iconify icon="material-symbols:line-start-circle-outline" />}
      label={labelProp}
      size="small"
      sx={{ bgcolor: `${colorChip}` }}
    />
  );
}
