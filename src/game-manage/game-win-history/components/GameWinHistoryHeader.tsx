import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { useTranslation } from 'react-i18next';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { IParamsListHistory } from '../interface';
import { Button } from '@mui/material';
import Iconify from '../../../common/components/Iconify';
import useMessage from 'src/common/hooks/useMessage';
import { useExportListGameWinHistory } from '../hooks/useExportListGameWinHistory';
import { useDispatch } from '../../../common/redux/store';
import ConfirmModalExport from './ConfirmModalExport';
import { setIsOpenModalRequestExport } from '../slice';

type Props = {
  searchParams: IParamsListHistory;
};

function GameWinHistoryHeader({ searchParams }: Props) {
  const { t } = useTranslation();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const dispatch = useDispatch();

  const { mutate } = useExportListGameWinHistory({
    onSuccess: () => {
      showSuccessSnackbar(t('userManage.export.successExport'));
      dispatch(setIsOpenModalRequestExport(true));
    },
    onError: () => showErrorSnackbar(t('userManage.export.failedExport')),
  });

  const handleRequestExport = () => {
    const startDate =
      searchParams.startDate === undefined || searchParams.startDate === null
        ? undefined
        : new Date(searchParams.startDate).toISOString();
    const endDate =
      searchParams.endDate === undefined || searchParams.endDate === null
        ? undefined
        : new Date(searchParams.endDate).toISOString();
    const newSearchParams: IParamsListHistory = {
      ...searchParams,
      startDate,
      endDate,
    };
    mutate(newSearchParams);
  };
  return (
    <>
      <HeaderBreadcrumbs
        heading={t('gameManage.win_history.title')}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.GAME_MANAGE, href: PATH_DASHBOARD.gameManage.root },
          { name: t('gameManage.win_history.title') },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            onClick={handleRequestExport}
          >
            {`${t('export')}`}
          </Button>
        }
      />
      <ConfirmModalExport />
    </>
  );
}

export default GameWinHistoryHeader;
