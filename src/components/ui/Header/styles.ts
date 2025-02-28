import styled, { keyframes } from "styled-components";
import { Flex } from "@styles/layout";
import { breakpoints } from "@styles/breakpoint";

export const ContainerHeader = styled(Flex)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;

  z-index: 1000;

  img {
    user-select: none;
    pointer-events: none;
  }
`;

type ScrollProps = {
  scrollOn: boolean;
};

export const ScrollOff = styled(Flex)<ScrollProps>`
  display: ${({ scrollOn }) => (scrollOn ? "none" : "flex")};
`;

export const ScrollOn = styled(Flex)<ScrollProps>`
  display: ${({ scrollOn }) => (scrollOn ? "flex" : "none")};
`;

type BackgroundImageProps = {
  height: number;
};

export const BackgroundImage = styled.div<BackgroundImageProps>`
  position: relative;
  height: ${({ height }) => height}px;
  width: 100dvw;
  overflow: hidden;

  user-select: none;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const Overlay = styled.div`
  background-color: rgba(21, 21, 21, 0.6);
  width: 100dvw;
  position: absolute;
  z-index: 1000;
  top: 0;
  height: 8rem;
`;

export const ContentHeader = styled(Flex)`
  align-items: center;
  border-bottom-left-radius: 1.6rem;
  border-bottom-right-radius: 1.6rem;
  box-shadow: var(--shadow-bottom-3);
  padding-top: 1.6rem;
  padding-bottom: 2.4rem;
  background-color: var(--white);

  .more-information-desktop {
    display: inline-flex;
  }

  .more-information-mobile {
    display: none;
  }

  .more-information-tablet {
    display: none;
  }

  @media (max-width: 1300px) {
    padding-right: 2.4rem;
  }

  @media ${breakpoints.md} {
    .more-information-tablet {
      display: inline-flex;
    }

    .more-information-desktop {
      display: none;
    }
  }

  @media (max-width: 635px) {
    .more-information-desktop {
      display: none;
    }

    .more-information-tablet {
      display: none;
    }

    .more-information-mobile {
      display: inline-flex;
      position: absolute;
      right: 2.4rem;
      top: 6.4rem;
    }
  }
`;

export const GridContentHeader = styled(Flex)`
  max-width: 128rem;
  width: 100%;
`;

export const imageScrollOff = keyframes`
  from {
    width: 4.8rem;
    height: 4.8rem;
  }

  to {
    width: 12rem;
    height: 12rem;
  }
`;

export const StoreImage = styled.img`
  width: 12rem;
  height: 12rem;
  position: absolute;
  top: 4rem;
  z-index: 20000;

  @media (max-width: 1300px) {
    left: 2.4rem;
  }

  @media (max-width: 635px) {
    width: 8rem;
    height: 8rem;
    top: 2rem;
  }
`;

export const StoreDetails = styled(Flex)`
  margin-left: 14.4rem;

  @media (max-width: 1300px) {
    margin-left: 16.8rem;
  }

  @media (max-width: 635px) {
    margin-top: 4.2rem;
    margin-left: 2.4rem;
  }
`;

export const ContentHeaderScrollOn = styled(Flex)`
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 1.6rem;
  border-bottom-right-radius: 1.6rem;
  box-shadow: var(--shadow-bottom-3);
  background-color: var(--white);
  height: 7.2rem;
  z-index: 1000000;

  .more-information-scroll-on-desktop {
    display: inline-flex;
  }

  .more-information-scroll-on-mobile {
    display: none;
  }

  .store-time {
    display: flex;
  }

  @media (max-width: 1300px) {
    padding: 2.4rem;
  }

  @media (max-width: 635px) {
    .more-information-scroll-on-desktop {
      display: none;
    }

    .more-information-scroll-on-mobile {
      display: inline-flex;
    }

    .store-time {
      display: none;
    }
  }
`;

export const imageScrollOn = keyframes`
  from {
    width: 12rem;
    height: 12rem;
  }
  to {
    width: 4.8rem;
    height: 4.8rem;
  }
`;

export const StoreImageScrollOn = styled.img`
  animation: ${imageScrollOn} 0.3s ease-out forwards;
`;

export const StoreContent = styled(Flex)`
  gap: 6.4rem;
  flex-direction: row;
  align-items: end;

  .label-info {
    display: block;
  }

  @media ${breakpoints.md} {
    flex-direction: column;
    align-items: start;
    gap: 0.4rem;

    .label-info {
      display: none;
    }
  }

  @media (max-width: 635px) {
    flex-direction: column;
    gap: 1.2rem;

    .label-info {
      display: block;
    }
  }
`;
