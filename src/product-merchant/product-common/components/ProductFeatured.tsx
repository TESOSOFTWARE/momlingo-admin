import { Button, Stack } from '@mui/material';
import Iconify from '../../../common/components/Iconify';

type featuredProps = {
  productType: boolean;
};
export function ProductFeatured({ productType }: featuredProps) {
  return (
    <>
      {productType ? (
        <Stack alignItems="center">
          <Iconify icon="fluent-emoji-flat:glowing-star" fontSize={30} />
        </Stack>
      ) : (
        <Stack alignItems="center">
          <Iconify
            icon="fluent-emoji-high-contrast:glowing-star"
            fontSize={30}
            color="GrayText"
          />
        </Stack>
      )}
    </>
  );
}
