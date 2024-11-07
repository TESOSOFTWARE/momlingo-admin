import { Chip } from '@mui/material';
type LabelProps = {
  labelProps: string;
  colorChip: string;
};
export function StatusChip({ labelProps, colorChip }: LabelProps) {
  return (
    <>
      <Chip
        sx={{
          color: 'whitesmoke',
          backgroundColor: colorChip,
          fontWeight: 'bold',
          borderRadius: '12px',
          width: 'fit-content',
        }}
        label={`${labelProps}`}
        size="small"
      />
    </>
  );
}
