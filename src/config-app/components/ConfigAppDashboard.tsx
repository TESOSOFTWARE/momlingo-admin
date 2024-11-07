import {
  Button,
  Card,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  Tooltip,
  Box,
  TablePagination,
  FormControlLabel,
  Switch,
} from '@mui/material';

import lodash from 'lodash';
import { useSelector } from 'react-redux';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useTable from '../../common/hooks/useTable';
import { useGetListConfigApp } from '../hooks/useGetListConfigApp';
import Scrollbar from '../../common/components/Scrollbar';
import LoadingTableSkeleton from '../../common/components/LoadingTableSkeleton';
import ConfigAppTableRow from './ConfigAppTableRow';
import { CONFIG_APP_TABLE_HEAD } from '../constants';

export default function ConfigAppDashBoard() {
  const { useDeepCompareEffect } = useDeepEffect();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { dense, page, rowsPerPage, onChangeDense, onChangePage, onChangeRowsPerPage } =
    useTable();

  const { data, isLoading } = useGetListConfigApp({});
  const listItem = data || [];

  const isNotFound = !isLoading && !listItem.length;

  return (
    <Card sx={{ paddingY: 1, borderRadius: '8px', boxShadow: 10, background: 'linear-gradient(to right bottom, white, #ECF9FF)' }}>
      <TableContainer sx={{ position: 'relative' }}>
        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom headLabel={CONFIG_APP_TABLE_HEAD} rowCount={listItem.length} />
          <TableBody>
            {listItem?.map((row) => (
              <ConfigAppTableRow key={row.id} row={row} />
            ))}
            {isLoading && (
              <LoadingTableSkeleton
                row={rowsPerPage}
                column={CONFIG_APP_TABLE_HEAD.length}
              />
            )}
            <TableNoData isNotFound={isNotFound} />
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
