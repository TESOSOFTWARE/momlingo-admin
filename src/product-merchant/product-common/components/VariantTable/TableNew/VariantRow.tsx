import { Box, Checkbox, TableCell, TableRow } from '@mui/material';
import lodash from 'lodash';
import { IPropVariantRow } from '../interface';

export default function VariantRow({ row, selected, onSelectRow }: IPropVariantRow) {
  const { images, price, sku, productAttributeTerms, productVariantPoint, quantity } =
    row;

  return (
    <TableRow hover selected={selected}>
      <TableCell align="left">
        <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
      </TableCell>
      <TableCell align="left">
        <Box
          component="img"
          sx={{
            height: 225,
            width: 325,
            maxHeight: { xs: 45, md: 45 },
            maxWidth: { xs: 45, md: 45 },
            borderRadius: '7px',
            objectFit: 'cover',
          }}
          alt={lodash.isEmpty(images) ? `no-images` : `${images[0].key}`}
          src={lodash.isEmpty(images) ? `no-images` : `${images[0].url}`}
        />
      </TableCell>

      <TableCell
        align="left"
        sx={{
          '&:hover': { color: 'red', cursor: 'pointer' },
          fontWeight: 'bold',
        }}
      >
        {sku}
      </TableCell>
      <TableCell align="center">{price}</TableCell>
      <TableCell align="center">{productVariantPoint.point}</TableCell>
      <TableCell align="center">{quantity}</TableCell>

      <TableCell align="center">
        {productAttributeTerms?.map(
          (item) => item?.productAttribute?.productAttributeDetails[0]?.name
        )}
      </TableCell>

      <TableCell align="center">
        {productAttributeTerms.map((item) =>
          item?.productAttributeTermDetails?.map((value) => value.value)
        )}
      </TableCell>
    </TableRow>
  );
}
