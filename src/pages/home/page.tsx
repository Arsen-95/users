import {
  Link as MuiLink,
  List,
  ListItem,
  Typography,
  Container,
} from '@mui/material';
import { Link } from 'react-router';

import { routerMap } from '@/shared/lib/router';
import * as lib from './lib';

export const HomePage = () => {
  return (
    <Container sx={{ pt: 2 }}>
      <Typography variant="h2" component="h1">
        Welcome to ReactJs app
      </Typography>
      <Typography variant="subtitle1">Used Libraries:</Typography>
      <List sx={{ mb: 10 }}>
        {lib.libraries.map(({ href, title }) => (
          <ListItem key={title}>
            <MuiLink href={href} target="_blank">
              {title}
            </MuiLink>
          </ListItem>
        ))}
      </List>
      <MuiLink
        variant="button"
        fontSize={24}
        component={Link}
        to={routerMap.users}
      >
        Go to Users page
      </MuiLink>
    </Container>
  );
};
