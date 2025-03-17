import { AccordionContent, AccordionTrigger } from "@radix-ui/react-accordion";
import { Flex } from "@radix-ui/themes";
import { breakpoints } from "@styles/breakpoint";
import styled from "styled-components";

export const ContainerTrainingPlans = styled(Flex)`
  padding: 3.2rem 2.4rem;

  .home-button-edit-training-desktop {
    display: inline-flex;
  }

  .home-button-edit-training-mobile {
    display: none;
  }

  @media ${breakpoints.xs} {
    .home-button-edit-training-desktop {
      display: none;
    }

    .home-button-edit-training-mobile {
      display: inline-flex;
    }
  }
`;

export const AccordionTriggerTraining = styled(AccordionTrigger)`
  padding: 1.2rem 1.6rem;
  border: 1px solid var(--gray-a5);
  border-radius: var(--radius-3);
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  .AccordionChevron {
    transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }

  &[data-state="open"] > .AccordionChevron {
    transform: rotate(180deg);
  }

  &[data-state="open"] {
    border-bottom: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  @media ${breakpoints.xs} {
    .accordion-title {
      max-width: 28rem;
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`;

export const AccordionContentTraining = styled(AccordionContent)`
  background-color: var(--gray-a2);
  padding: var(--space-4) var(--space-5);
  border: 1px solid var(--gray-a5);
  border-top: 0;
  border-bottom-left-radius: var(--radius-3);
  border-bottom-right-radius: var(--radius-3);

  &[data-state="open"] {
    display: grid;
    gap: var(--space-5);
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  }
`;

export const ContenteAlternativeExercises = styled(Flex)`
  display: grid;
  gap: var(--space-5);
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
`;

export const CardExercise = styled(Flex)`
  flex: 1;
  padding: var(--space-4);
  border-radius: var(--radius-3);
  border: 1px solid var(--gray-a5);
  gap: var(--space-3);
`;

export const ImageExercise = styled.img`
  object-fit: contain;
  width: 100%;
`;
