import OrderTable from './order-table/OrderTable';
import OrderFilter from './OrderFilter';

type Props = {
  smallTable?: boolean;
  searchUserId?: number;
};
export default function OrderForm({ smallTable, searchUserId }: Props) {
  return (
    <>
      <OrderTable smallTable={smallTable} searchUserId={searchUserId} />
    </>
  );
}
