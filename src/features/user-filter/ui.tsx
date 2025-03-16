import { TextField, Button, Box, BoxProps } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as model from './model';
import * as lib from './lib';

export const UsersFilterForm = ({
  tableRef,
  ...props
}: BoxProps & { tableRef: React.RefObject<HTMLDivElement | null> }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<lib.FilterFormValues>({
    resolver: yupResolver(lib.schema),
  });

  const { setFilters } = model.useUsersFilterStore();

  const onSubmit = (filters: lib.FilterFormValues) => {
    tableRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    setFilters(filters);
  };

  const handleReset = () => {
    setFilters({});
    reset();
    tableRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box display="flex" gap={2} alignItems="center" {...props}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', gap: 2 }}
      >
        <TextField
          label="First Name"
          {...register('firstName')}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <TextField
          label="Last Name"
          {...register('lastName')}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
        <TextField
          label="City"
          {...register('city')}
          error={!!errors.city}
          helperText={errors.city?.message}
        />
        <Button type="submit" variant="contained" sx={{ width: '150px' }}>
          Filter
        </Button>
      </Box>
      <Button variant="text" onClick={handleReset}>
        Reset filters
      </Button>
    </Box>
  );
};
