import { Container, ContainerProps } from '@mui/material';

type Props = {
  children: React.ReactNode;
  isFullHeight?: boolean;
} & ContainerProps;

export const ContainerUi = ({
  isFullHeight = true,
  children,
  ...props
}: Props) => {
  return (
    <Container
      {...props}
      sx={{ height: isFullHeight ? '100%' : 'auto', py: 2, ...props.sx }}
    >
      {children}
    </Container>
  );
};
