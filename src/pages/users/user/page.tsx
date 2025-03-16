import { Link as RouterLink, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  TextField,
  Stack,
  Link,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import { ContainerUi } from '@/shared/ui';
import * as model from './model';
import * as lib from './lib';
import { routerMap } from '@/shared/lib';

export const UserPage = () => {
  const { id } = useParams<'id'>();
  const userId = +(id ?? 0);

  const { data } = model.useUser(userId);
  const { setUser } = model.useUserStore();
  const mutation = model.useUpdateUser();

  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<model.UserData>({
    resolver: yupResolver(lib.userSchema),
  });

  useEffect(() => {
    setUser(data);
    reset(data || {});
  }, [data, setUser, reset]);

  const handleEditToggle = () => setIsEditing((prev) => !prev);

  const onSubmit = (formData: model.UserData) => {
    mutation.mutate(
      { id: userId, userData: formData },
      { onSuccess: () => setIsEditing(false) }
    );
  };

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
        <Card
          sx={{
            maxWidth: 500,
            width: '100%',
            p: 3,
            boxShadow: 2,
            borderRadius: 2,
            backgroundColor: 'white',
          }}
        >
          <CardContent sx={{ textAlign: 'center' }}>
            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="First name"
                  {...register('firstName')}
                  fullWidth
                  margin="normal"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
                <TextField
                  label="Last name"
                  {...register('lastName')}
                  fullWidth
                  margin="normal"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
                <TextField
                  label="City"
                  {...register('city')}
                  fullWidth
                  margin="normal"
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, width: '100%' }}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? 'Saving...' : 'Save'}
                </Button>
              </form>
            ) : (
              <>
                <Typography
                  component="h6"
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                >
                  {data?.firstName} {data?.lastName}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  <strong>City:</strong> {data?.city ?? '-'}
                </Typography>
              </>
            )}

            <Stack spacing={2} direction="row" justifyContent="center" mt={3}>
              {!isEditing && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ px: 5 }}
                  onClick={handleEditToggle}
                >
                  Update Profile
                </Button>
              )}
            </Stack>
          </CardContent>
        </Card>
        <Link component={RouterLink} to={routerMap.users}>
          To all users
        </Link>
      </Box>
    </ContainerUi>
  );
};
