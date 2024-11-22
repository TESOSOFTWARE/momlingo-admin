import i18n from 'src/common/locales/i18n';
import Page from '../common/components/Page';
import useSettings from '../common/hooks/useSettings';
import HeaderBreadcrumbs from '../common/components/HeaderBreadcrumbs';
import ListRuleDashBoard from './components/RuleDashboard';
import lodash from 'lodash';
import useTable from '../common/hooks/useTable';
import { useGetBabyTracker } from '../config-off-checkout/config-feature-list/hooks/useGetBabyTracker';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Stack,
  Card,
  Box,
  TablePagination,
  FormControlLabel,
  Switch,
  Button,
} from '@mui/material';
import { TableHeadCustom } from '../common/components/table';
import { BabyTrackerTableRow } from '../config-off-checkout/config-feature-list/components/config-feature-table/BabyTrackerTableRow';
import { TABLE_HEAD } from '../feedback/constants';
import { CHILD_TRACKER_TABLE_HEAD } from './constants';
import { useGetListChildTracker } from './hooks/useGetListChildTracker';
import { ChildTrackerTableRow } from './components/ChildTrackerTableRow';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../common/routes/paths';
export default function RuleManagement() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { themeStretch } = useSettings();
  const { data: trackerList } = useGetListChildTracker();
  console.log(trackerList);
  const navigate = useNavigate();
  // const listRequest = DATA_LIST_USER;
  const totalItems = Array.isArray(trackerList) ? trackerList.length : 0;
  const paginatedList = Array.isArray(trackerList)
    ? trackerList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : [];
  console.log(paginatedList);
  return (
    <Page title={i18n.t('ruleManage.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={i18n.t('ruleManage.list')}
          links={[
            {
              name: `${i18n.t('ruleManage.title')}`,
              href: '',
            },
            {
              name: `${i18n.t('ruleManage.list')}`,
              href: '',
            },
          ]}
        />
        {/* <ListRuleDashBoard/> */}
        <Card
          sx={{
            padding: 2,
            background: 'linear-gradient(to right bottom, white, #ECF9FF)',
            boxShadow: 10,
          }}
        >
          <Stack spacing={3}>
            <Button
              sx={{
                width: '300px',
              }}
              onClick={() => {
                navigate(PATH_DASHBOARD.configFeature.new.childTracker);
              }}
            >
              Thêm mới tracker
            </Button>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={CHILD_TRACKER_TABLE_HEAD}
                />
                <TableBody>
                  {Object.keys(paginatedList || {}).map((obj) => (
                    <ChildTrackerTableRow
                      key={obj}
                      rowCode={obj}
                      TrackerList={paginatedList}
                    />
                  ))}
                  {/* <TableNoData isNotFound={!listProductAttribute?.length} /> */}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ position: 'relative' }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={lodash.isEmpty(totalItems) ? (totalItems as number) : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
              />
              <FormControlLabel
                control={<Switch checked={dense} onChange={onChangeDense} />}
                label="Dense"
                sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
              />
            </Box>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
