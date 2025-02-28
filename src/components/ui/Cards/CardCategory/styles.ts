import styled from "styled-components";
import { Flex } from "@styles/layout";

export const ContainerCardCategory = styled(Flex)`
  background-color: ${({ color }) => color};
  /* max-width: 38.8rem; */
  width: 100%;
  height: 24rem;
  border-radius: 1.2rem;
  user-select: none;
  padding: 2.4rem;
  align-items: center;
  gap: 1.6rem;
  overflow: hidden;

  cursor: pointer;

  img {
    pointer-events: none;
  }

  &:hover img {
    transform: scale(1.067);
  }

  @media (max-width: 550px) {
    height: 20rem;
  }

  @media (max-width: 450px) {
    height: 14rem;
  }
`;

export const ImageCategory = styled.img`
  width: 30rem;
  height: 30rem;

  transition: transform 0.3s ease-in-out;

  @media (max-width: 600px) {
    width: 25rem;
    height: 25rem;
  }

  @media (max-width: 450px) {
    width: 15rem;
    height: 15rem;
  }
`;
