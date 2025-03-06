import {
  Box,
  BoxProps,
  Container,
  ContainerProps,
  Flex,
  FlexProps,
  Grid,
  GridProps,
  Section,
  SectionProps,
} from "@radix-ui/themes";
import styled from "styled-components";

const FlexLayout: any = Flex;
const BoxLayout: any = Box;
const GridLayout: any = Grid;
const SectionLayout: any = Section;
const ContainerLayout: any = Container;

export const FlexComponent = styled(FlexLayout)<FlexProps>``;
export const BoxComponent = styled(BoxLayout)<BoxProps>``;
export const GridComponent = styled(GridLayout)<GridProps>``;
export const SectionComponent = styled(SectionLayout)<SectionProps>``;
export const ContainerComponent = styled(ContainerLayout)<ContainerProps>``;
