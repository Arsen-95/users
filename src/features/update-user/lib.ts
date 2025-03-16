import * as yup from 'yup';

export const userSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'Имя может содержать только латинские буквы')
    .required('Имя обязательно'),
  lastName: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'Фамилия может содержать только латинские буквы')
    .required('Фамилия обязательна'),
  city: yup
    .string()
    .matches(
      /^[A-Za-z\s]+$/,
      'Город может содержать только латинские буквы и пробелы'
    )
    .required('Город обязателен'),
});

export type UpdateUserValues = yup.InferType<typeof userSchema>;
