import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { User } from '@/shared/types';
import * as model from './model';
import * as lib from './lib';

export const UpdateUser = ({ data }: { data?: User }) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleEditToggle = () => setIsEditing((prev) => !prev);
  const mutation = model.useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<lib.UpdateUserValues>({
    resolver: yupResolver(lib.userSchema),
  });

  const onSubmit = (formData: lib.UpdateUserValues) => {
    mutation.mutate(
      { id: data?.id ?? 0, userData: formData },
      { onSuccess: () => setIsEditing(false) }
    );
  };

  useEffect(() => {
    reset(data || {});
  }, [data, reset]);

  return (
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
              fullWidth
              sx={{ mt: 3, mb: 1 }}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Saving...' : 'Save'}
            </Button>
            <Button
              fullWidth
              onClick={() => {
                reset(data || {});
                setIsEditing(false);
              }}
            >
              Cancel
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
  );
};
