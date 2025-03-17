import { Flex, Text } from "@radix-ui/themes";
import { breakpoints } from "@styles/breakpoint";
import styled, { css } from "styled-components";

export const ContainerCreateManualWorkout = styled(Flex)`
  flex: 1;
  max-width: 128rem;
  width: 100%;

  @media ${breakpoints.lg} {
    padding: var(--space-5);
  }
`;

export const CardFormWorkout = styled(Flex)`
  border: 1px solid var(--gray-a5);
  padding: 2rem;
  border-radius: var(--radius-3);
  flex-direction: column;

  gap: var(--space-6);
  background-color: var(--white);
`;

export const TitleFormWorkout = styled(Text).attrs({
  size: "5",
  weight: "bold",
})``;

export const DescriptionFormWorkout = styled(Text).attrs({
  color: "gray",
  size: "2",
})``;

export const ContainerSelectExercises = styled(Flex).attrs({
  direction: "column",
})`
  gap: var(--space-4);
`;

export const ContentSelectExercises = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 30rem));
  justify-content: center;
`;

type CardExerciseProps = {
  selected?: boolean;
  isNotClickable?: boolean;
};

export const CardExercise = styled(Flex)<CardExerciseProps>`
  padding: 1.6rem;
  flex-direction: column;
  border: 1px solid var(--gray-a5);
  border-radius: var(--radius-3);
  gap: 1.2rem;
  max-width: 30rem;

  transition: all 0.2s ease;

  ${({ isNotClickable }) =>
    !isNotClickable &&
    css`
      cursor: pointer;
      &:hover {
        border-color: var(--accent-a9);
      }
    `}

  ${({ selected }) =>
    selected &&
    css`
      border-color: var(--accent-a9);
      background: var(--accent-a3);
    `}
`;

export const ImageExercise = styled.img`
  width: 100%;
`;

export const CardWorkout = styled(Flex)`
  border: 1px solid var(--gray-a5);
  border-radius: var(--radius-3);
  padding: 1.6rem;

  @media ${breakpoints.xs} {
    .card-workout-title {
      max-width: 18rem;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const SelectMuscleGroup = styled(Flex)`
  width: 40%;

  @media ${breakpoints.md} {
    width: 60%;
  }

  @media ${breakpoints.sm} {
    width: 100%;
  }
`;
