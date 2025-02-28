import { Flex } from "@styles/layout";
import {
  BackgroundImage,
  ContainerHeader,
  ContentHeader,
  ContentHeaderScrollOn,
  GridContentHeader,
  Overlay,
  ScrollOff,
  ScrollOn,
  StoreContent,
  StoreDetails,
  StoreImage,
  StoreImageScrollOn,
} from "./styles";
import { Button } from "../Button";
import {
  IconBuildingStore,
  IconClock,
  IconInfoCircle,
  IconLock,
  IconMapPin,
  IconMotorbike,
  IconWallet,
} from "@tabler/icons-react";
import { Heading, Text } from "@styles/typography";
import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { MoreInformation } from "@components/MoreInformation";
import { useLocation } from "react-router-dom";
import { IconButton } from "../IconButton";
import { useBusinessInformation } from "@hooks/useBusinessInformation";
import { formatPrice } from "@utils/pages/formatPrice";
import { useBusinessHours } from "@hooks/useBusinessHours";
import { formatTime } from "@utils/pages/formatTime";

type HeaderProps = {
  backgroundImage: string;
  storeName: string;
  storeImage: string;
};

export function Header({
  backgroundImage,
  storeName,
  storeImage,
}: HeaderProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openingHours, setOpeningHours] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { businessInformation } = useBusinessInformation();

  const { businessHours } = useBusinessHours();

  const currentPath = useLocation();

  const backgroundHeight = windowWidth > 635 ? 80 : 48;

  function checkStoreStatus() {
    if (!businessHours) return;

    // Obtém o dia da semana atual (0 = Domingo, 1 = Segunda-feira, ..., 6 = Sábado)
    const currentWeekDay = new Date().getDay();

    // Encontra o dado correspondente ao dia atual
    const todayData = businessHours.find((data) => {
      const weekDays = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
      ];
      return data.weekDay === weekDays[currentWeekDay];
    });

    if (
      !todayData ||
      todayData.status === "Fechado" ||
      !todayData.openingTime ||
      !todayData.closingTime
    ) {
      // Caso a loja esteja fechada ou os horários não estejam disponíveis
      setIsOpen(false);
      return;
    }

    const { openingTime, closingTime } = todayData;

    if (openingTime.trim() !== "" && closingTime.trim() !== "") {
      setOpeningHours(formatTime(openingTime));
      setClosingTime(formatTime(closingTime));
    }

    // Converte os horários para objetos Date
    const timeReceivedOpen = new Date(openingTime);
    const timeReceivedClose = new Date(closingTime);

    const currentTime = new Date();

    // Extraímos apenas horas e minutos (em minutos totais)
    const currentMinutes =
      currentTime.getHours() * 60 + currentTime.getMinutes();
    const openMinutes =
      timeReceivedOpen.getHours() * 60 + timeReceivedOpen.getMinutes();
    const closeMinutes =
      timeReceivedClose.getHours() * 60 + timeReceivedClose.getMinutes();

    // Ajuste para o caso de o horário de fechamento ser no dia seguinte
    if (closeMinutes < openMinutes) {
      // Se o horário de fechamento é menor que o de abertura, então é após a meia-noite
      if (currentMinutes >= openMinutes || currentMinutes < closeMinutes) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
      return;
    }

    // Verifica se o horário atual está dentro do intervalo de abertura e fechamento
    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    const interval = setInterval(checkStoreStatus, 60000);
    checkStoreStatus();

    return () => clearInterval(interval);
  }, [businessHours]);

  useEffect(() => {
    // Função para atualizar a largura da janela
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Adiciona o evento de resize
    window.addEventListener("resize", handleResize);

    // Remove o evento no cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ContainerHeader>
      <Modal.Root
        isOpenModal={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        title="Mais informações"
      >
        <MoreInformation />
      </Modal.Root>

      <ScrollOff scrollOn={scrollY > 0 || currentPath.pathname !== "/"}>
        <BackgroundImage
          height={scrollY <= backgroundHeight ? backgroundHeight - scrollY : 0}
        >
          <img src={backgroundImage} alt="" />
          <Overlay />
        </BackgroundImage>

        <ContentHeader>
          <GridContentHeader>
            <StoreImage src={storeImage} alt="" />

            <Button
              size="1"
              variant="secondary"
              onClick={() => setIsModalOpen(true)}
              className="more-information-mobile"
            >
              <IconInfoCircle size={20} />
              Mais informações
            </Button>

            <StoreDetails
              gap={1}
              align="center"
              direction="row"
              justify="space-between"
            >
              <StoreContent>
                <Flex>
                  <Heading size="3">{storeName}</Heading>

                  <Flex gap={4} direction="row" align="center">
                    {isOpen && (
                      <Flex gap={1} align="center" direction="row">
                        <IconBuildingStore
                          color="var(--success-500)"
                          size={16}
                        />

                        <Text size="1" color="var(--success-500)" weight="bold">
                          Aberto até às {closingTime}
                        </Text>
                      </Flex>
                    )}

                    {!isOpen && (
                      <Flex gap={1} direction="row" align="center">
                        <IconLock color="var(--danger-500)" size={16} />

                        <Text size="1" color="var(--danger-500)" weight="bold">
                          Fechado{" "}
                          {openingHours.trim() !== "" &&
                            `- Abrimos às ${openingHours}`}
                        </Text>
                      </Flex>
                    )}

                    <Flex gap={1} direction="row" align="center">
                      <IconMapPin size={16} color="var(--gray-700)" />

                      <Text size="1" color="var(--gray-700)">
                        {businessInformation &&
                          `${
                            businessInformation.city
                          } - ${businessInformation.state.toUpperCase()}`}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex gap={6} direction="row">
                  <Flex>
                    <Text color="var(--gray-700)" className="label-info">
                      Pedido mínimo
                    </Text>

                    <Flex align="center" gap={1} direction="row">
                      <IconWallet size={16} color="var(--gray-900)" />

                      <Text weight="bold">
                        R${" "}
                        {businessInformation &&
                          formatPrice(businessInformation.minimumValue)}
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex>
                    <Text color="var(--gray-700)" className="label-info">
                      Entrega
                    </Text>

                    <Flex align="center" gap={1} direction="row">
                      <IconMotorbike size={16} color="var(--gray-900)" />

                      <Text weight="bold">
                        R${" "}
                        {businessInformation &&
                          formatPrice(businessInformation.deliveryFee)}
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex>
                    <Text color="var(--gray-700)" className="label-info">
                      Tempo médio
                    </Text>

                    <Flex align="center" gap={1} direction="row">
                      <IconClock size={16} color="var(--gray-900)" />

                      <Text weight="bold">
                        {businessInformation &&
                          businessInformation.averageDeliveryTime}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </StoreContent>

              <Button
                size="2"
                variant="secondary"
                onClick={() => setIsModalOpen(true)}
                className="more-information-desktop"
              >
                <IconInfoCircle size={20} />
                Mais informações
              </Button>

              <IconButton
                size="2"
                variant="secondary"
                onClick={() => setIsModalOpen(true)}
                className="more-information-tablet"
              >
                <IconInfoCircle size={20} />
              </IconButton>
            </StoreDetails>
          </GridContentHeader>
        </ContentHeader>
      </ScrollOff>

      <ScrollOn scrollOn={scrollY > 0 || currentPath.pathname !== "/"}>
        <ContentHeaderScrollOn>
          <GridContentHeader>
            <Flex
              gap={1}
              align="center"
              direction="row"
              justify="space-between"
            >
              <Flex gap={4} direction="row" align="center">
                <StoreImageScrollOn src={storeImage} alt="" />

                <Heading size="2">{storeName}</Heading>

                {isOpen && (
                  <Flex
                    className="store-time"
                    gap={1}
                    align="center"
                    direction="row"
                  >
                    <IconBuildingStore color="var(--success-500)" size={16} />

                    <Text size="1" color="var(--success-500)" weight="bold">
                      Aberto até às {closingTime}
                    </Text>
                  </Flex>
                )}

                {!isOpen && (
                  <Flex
                    className="store-time"
                    gap={1}
                    align="center"
                    direction="row"
                  >
                    <IconLock color="var(--danger-500)" size={16} />

                    <Text size="1" color="var(--danger-500)" weight="bold">
                      Fechado{" "}
                      {openingHours.trim() !== "" &&
                        `- Abrimos às ${openingHours}`}
                    </Text>
                  </Flex>
                )}
              </Flex>

              <Button
                size="2"
                variant="secondary"
                onClick={() => setIsModalOpen(true)}
                className="more-information-scroll-on-desktop"
              >
                <IconInfoCircle size={20} />
                Mais informações
              </Button>

              <IconButton
                size="2"
                variant="secondary"
                onClick={() => setIsModalOpen(true)}
                className="more-information-scroll-on-mobile"
              >
                <IconInfoCircle size={20} />
              </IconButton>
            </Flex>
          </GridContentHeader>
        </ContentHeaderScrollOn>
      </ScrollOn>
    </ContainerHeader>
  );
}
