import Box, { Props as BoxProps } from "./Box";
import styled from "@emotion/styled";

const _Card = styled(Box)(({ theme }) => ({
  display: "flex",
  color: 'black',
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.borderRadius_3,
  backgroundColor: 'white',
  padding: theme.space_lg,
  boxShadow: `${theme.shadowDark}, ${theme.shadowLight}`,
}));

type Props<T> = BoxProps<T>;

export default function Card<T>(props: Props<T>): JSX.Element {
  return <_Card {...props} />;
}
