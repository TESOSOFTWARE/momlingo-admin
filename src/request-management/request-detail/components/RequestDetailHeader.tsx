import { Button } from '@mui/material';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import vn from 'src/common/locales/vn';
import { IRequestDetail, IStatus } from '../interface';
import { useSelector } from 'react-redux';
import { dispatch, store } from '../../../common/redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import RejectDownloadModal from './SetPassWordModal';
import useMessage from 'src/common/hooks/useMessage';
import { useApproveDownload } from '../hooks/useApproveDownload';
import { useEffect } from 'react';
import { exportSuccess } from '../../request-list/list-slice';
import { requestDownload } from '../service';
import { useRequestDownload } from '../hooks/useRequestDownload';

type HeaderProps = {
  handleClickExport: () => void;
  showButton: string;
};

export default function RequestDetailHeader({
  handleClickExport,
  showButton,
}: HeaderProps) {
  const { fileId } = useParams();
  const navigate = useNavigate();

  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();

  const { mutate: mutateApproveDownload, isSuccess } = useApproveDownload(
    {
      onSuccess: () => showSuccessSnackbar(vn.approveDownload.success),
      onError: () => showErrorSnackbar(vn.approveDownload.fail),
    },
    parseInt(fileId as string)
  );
  useEffect(() => {
    if (isSuccess)
      window.location.href = PATH_DASHBOARD.requestManage.detail(fileId!.toString());
  }, [isSuccess]);

  const { mutate: mutateRequestDownload, isSuccess: successRequest } = useRequestDownload(
    {
      onSuccess: () => showSuccessSnackbar(vn.requestDownload.success),
      onError: () => showErrorSnackbar(vn.requestDownload.fail),
    },
    parseInt(fileId as string)
  );
  useEffect(() => {
    if (successRequest)
      window.location.href = PATH_DASHBOARD.requestManage.detail(fileId!.toString());
  }, [successRequest]);
  return (
    <>
      <HeaderBreadcrumbs
        heading={vn.Request_detail}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.REQUEST, href: PATH_DASHBOARD.requestManage.list },
          { name: BREADCUMBS.LIST_REQUEST, href: PATH_DASHBOARD.requestManage.list },
          { name: vn.Request_detail },
        ]}
        action={
          showButton === IStatus.APPROVED ? (
            <>
              <Button
                variant="contained"
                startIcon={<DescriptionOutlinedIcon />}
                size="medium"
                onClick={() => {
                  handleClickExport();
                }}
              >
                {vn.requestDownload.export}
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              startIcon={<DescriptionOutlinedIcon />}
              size="medium"
              disabled
              onClick={() => {
                handleClickExport();
              }}
            >
              {vn.requestDownload.export}
            </Button>
          )
        }
      />
    </>
  );
}
