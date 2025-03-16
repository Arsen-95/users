import { Link as RouterLink, useParams } from 'react-router';
import { useEffect } from 'react';
import { Box, Link } from '@mui/material';

import { UpdateUser } from '@/features/update-user';
import { ContainerUi } from '@/shared/ui';
import { routerMap } from '@/shared/lib';
import * as model from './model';

export const UserPage = () => {
  const { id } = useParams<'id'>();
  const userId = +(id ?? 0);

  const { data } = model.useUser(userId);
  const { setUser } = model.useUserStore();

  useEffect(() => {
    setUser(data);
  }, [data, setUser]);

  return (
    <ContainerUi>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        flexDirection="column"
        gap={2}
      >
        <UpdateUser data={data} />
        <Link component={RouterLink} to={routerMap.users}>
          To all users
        </Link>
      </Box>
    </ContainerUi>
  );
};
