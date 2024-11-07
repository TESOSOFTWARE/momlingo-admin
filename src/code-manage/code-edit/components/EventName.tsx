import { InputAdornment, TextField } from '@mui/material';
import Iconify from '../../../common/components/Iconify';
import useMessage from '../../../common/hooks/useMessage';
import en from '../../../common/locales/en';
import { useGetEventById } from '../hooks/useGetEventById';

type EventNameProps = {
  eventId: number;
};

export default function EventName({ eventId }: EventNameProps) {
  const { showErrorSnackbar } = useMessage();
  const eventResData = useGetEventById({
    eventId,
    callback: {
      onSuccess: () => {},
      onError: () => showErrorSnackbar(en.getEventNameFail),
    },
  });
  const eventName = eventResData.data?.name;

  return (
    <TextField
      label={en.labelEventName}
      value={eventName}
      disabled
      InputLabelProps={{ shrink: true }}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <Iconify
              icon={'fluent-mdl2:field-read-only'}
              sx={{
                color: 'text.disabled',
                width: 20,
                height: 20,
                marginRight: '10px',
              }}
            />
          </InputAdornment>
        ),
      }}
    />
  );
}
