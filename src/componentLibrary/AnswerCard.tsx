import Box, { Props as BoxProps } from "./Box";
import styled from "@emotion/styled";

const _AnswerCard = styled(Box)<{ selectedOrNot: boolean }>(({ theme, selectedOrNot }) => ({
  display: "flex",
  color: theme.textColor,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.borderRadius_3,
  backgroundColor: selectedOrNot ? 'blue' : theme.cardBackground,  // Change color based on selectedOrNot prop
  padding: theme.space_lg,
  boxShadow: `${theme.shadowDark}, ${theme.shadowLight}`,
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: 'blue',
  },
}));

type Props<T> = BoxProps<T> & {
  selectedOrNot: boolean;
};

export default function AnswerCard<T>({ selectedOrNot, ...props }: Props<T>): JSX.Element {
  return <_AnswerCard selectedOrNot={selectedOrNot} {...props} />;
}
