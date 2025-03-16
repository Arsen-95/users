import * as yup from 'yup';

export const schema = yup.object({
  firstName: yup
    .string()
    .nullable()
    .notRequired()
    .matches(/^[A-Za-z\s-]*$/, 'Only latin letters'),
  lastName: yup
    .string()
    .nullable()
    .notRequired()
    .matches(/^[A-Za-z\s-]*$/, 'Only latin letters'),
  city: yup
    .string()
    .nullable()
    .notRequired()
    .matches(/^[A-Za-z\s-]*$/, 'Only latin letters'),
});

export type FilterFormValues = yup.InferType<typeof schema>;
