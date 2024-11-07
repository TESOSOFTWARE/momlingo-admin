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
          borderRadius: '8px',
          // width: 'fit-content',
          minWidth: '120px',
          minHeight: '30px',
          // textShadow: '0.5px 0.5px black',
          boxShadow: 3,
        }}
        label={`${labelProps}`}
        size="small"
      />
    </>
  );
}
