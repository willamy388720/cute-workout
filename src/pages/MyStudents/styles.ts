import { Flex } from "@radix-ui/themes";
import styled from "styled-components";

export const ContainerMyStudents = styled(Flex)`
  padding: var(--space-5);
  flex: 1;
`;

export const ContentStudents = styled.div`
  display: grid;
  gap: var(--space-3);
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
`;
