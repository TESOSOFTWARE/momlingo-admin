import { Button, Divider, Stack } from '@mui/material';
import Iconify from '../../../common/components/Iconify';

type featuredProps = {
  productType: boolean;
};
export function ProductFeaturedMedal({ productType }: featuredProps) {
  return (
    <>
      {productType ? (
        <>
          <Stack direction="row" alignItems="center" height="40px">
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderWidth: '5px',
                bgcolor: '#55ACEE',
                borderBottomLeftRadius: '3px',
              }}
            />
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderWidth: '5px',
                bgcolor: '#176CC7',
                borderBottomRightRadius: '3px',
              }}
            />
          </Stack>
          <Stack alignItems="center">
            <Iconify icon="fluent-emoji-flat:glowing-star" fontSize={30} />
          </Stack>
        </>
      ) : (
        <>
          <Stack direction="row" alignItems="center" height="40px">
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderWidth: '5px',
                bgcolor: '#09ED17',
                borderBottomLeftRadius: '3px',
              }}
            />
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderWidth: '5px',
                bgcolor: '#EDEB07',
                borderBottomRightRadius: '3px',
              }}
            />
          </Stack>
          <Stack alignItems="center">
            <Iconify
              icon="fluent-emoji-high-contrast:glowing-star"
              fontSize={30}
              color="GrayText"
            />
          </Stack>
        </>
      )}
    </>
  );
}
