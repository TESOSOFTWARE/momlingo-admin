import HistoryGiftFilterFilter from './HistoryGiftFIlter';
import HistoryGiftTable from './HistoryGiftTable';

type Props = {
  searchUserId?: number;
};

export default function HistoryGiftForm({ searchUserId }: Props) {
  return (
    <>
      <HistoryGiftFilterFilter searchUserId={searchUserId} />
      <HistoryGiftTable searchUserId={searchUserId} />
    </>
  );
}
