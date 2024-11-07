import { Chip } from '@mui/material';
type LabelProps = {
  labelProps: string;
  isActive: boolean;
  colorChipTrue?: string;
  colorTextTrue?: string;
  colorChipFalse?: string;
  colorTextFalse?: string;
};
export function StatusChip({
  labelProps,
  isActive,
  colorChipTrue,
  colorTextTrue,
  colorChipFalse,
  colorTextFalse,
}: LabelProps) {
  return (
    <>
      {isActive ? (
        colorChipTrue && colorTextTrue ? (
          <Chip
            sx={{
              color: colorTextTrue,
              backgroundColor: colorChipTrue,
              fontWeight: 'bold',
              borderRadius: '7px',
              width: 'fit-content',
            }}
            label={`${labelProps}`}
            size="small"
          />
        ) : (
          <Chip
            sx={{
              color: '#229A16',
              backgroundColor: '#E4F8DD',
              fontWeight: 'bold',
              borderRadius: '7px',
              width: 'fit-content',
            }}
            label={`${labelProps}`}
            size="small"
          />
        )
      ) : colorChipFalse && colorTextFalse ? (
        <Chip
          sx={{
            color: colorTextFalse,
            backgroundColor: colorChipFalse,
            fontWeight: 'bold',
            borderRadius: '7px',
            width: 'fit-content',
          }}
          label={`${labelProps}`}
          size="small"
        />
      ) : (
        <Chip
          sx={{
            color: '#C74843',
            backgroundColor: '#FFE4DE',
            fontWeight: 'bold',
            borderRadius: '7px',
            width: 'fit-content',
          }}
          label={`${labelProps}`}
          size="small"
        />
      )}
    </>
  );
}
