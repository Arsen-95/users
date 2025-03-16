import { useEffect, useRef } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import { UsersFilterForm } from '@/features/user-filter';
import { ContainerUi, VirtualizedTable } from '@/shared/ui';
import * as model from './model';
import * as lib from './lib';
import { User } from '@/shared/types';
import { routerMap } from '@/shared/lib';

export const UserPage = () => {
  const tableRef = useRef<HTMLDivElement>(null);

  return (
    <ContainerUi>
      <Box display="flex" flexDirection="column" height="100%">
        <Typography variant="h5" mb={5}>
          List of users
        </Typography>
        <UsersFilterForm mb={4} tableRef={tableRef} />
        <UsersTable tableRef={tableRef} />
      </Box>
    </ContainerUi>
  );
};

const UsersTable = ({
  tableRef,
}: {
  tableRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const { data, fetchNextPage, hasNextPage } = model.useUsers();
  const { users, addUsers, setTotal, total } = model.useUsersStore();
  const navigate = useNavigate();

  function navigateToUserPage(user: User) {
    navigate(`${routerMap.users}/${user.id}`);
  }

  useEffect(() => {
    if (data) {
      addUsers(data.pages.flatMap((page) => page.users));
      setTotal(data.pages[0]?.total);
    }
  }, [data, addUsers, setTotal]);

  if (total === 0) {
    return <p>No data to show</p>;
  }

  return (
    <Paper
      style={{ flex: 1, overflow: 'auto', display: 'flex', height: '100%' }}
      ref={tableRef}
    >
      <VirtualizedTable
        onRowClick={navigateToUserPage}
        customScrollParent={tableRef.current as HTMLElement}
        columns={lib.columns}
        data={users}
        endReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
      />
    </Paper>
  );
};
