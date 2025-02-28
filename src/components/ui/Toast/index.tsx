import { ElementType, useEffect } from "react";
import { ContainerToast, ContentToast } from "./styles";
import { Flex } from "@styles/layout";
import { Link, Text } from "@styles/typography";

type ToastProps = {
  icon: ElementType;
  variant: "default" | "dark" | "success" | "info" | "warning" | "danger";
  title: string;
  isOpen: boolean;
  closeToast: () => void;
  description?: string;
  hasButtonClose?: boolean;
};

const variantStyles = {
  default: {
    toastColor: "var(--white)",
    titleAndIconColor: "var(--gray-900)",
    descriptionColor: "var(--gray-600)",
  },
  dark: {
    toastColor: "var(--gray-900)",
    titleAndIconColor: "var(--white)",
    descriptionColor: "var(--gray-300)",
  },
  success: {
    toastColor: "var(--success-500)",
    titleAndIconColor: "var(--white)",
    descriptionColor: "var(--white)",
  },
  info: {
    toastColor: "var(--info-500)",
    titleAndIconColor: "var(--white)",
    descriptionColor: "var(--white)",
  },
  warning: {
    toastColor: "var(--warning-500)",
    titleAndIconColor: "var(--warning-800)",
    descriptionColor: "var(--warning-800)",
  },
  danger: {
    toastColor: "var(--danger-500)",
    titleAndIconColor: "var(--white)",
    descriptionColor: "var(--white)",
  },
};

export function Toast({
  icon: Icon,
  variant,
  title,
  isOpen,
  description,
  hasButtonClose,
  closeToast,
}: ToastProps) {
  const { toastColor, titleAndIconColor, descriptionColor } =
    variantStyles[variant] || variantStyles.default;

  useEffect(() => {
    if (!hasButtonClose) {
      const timer = setTimeout(() => {
        closeToast();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasButtonClose, isOpen]);

  return (
    <ContainerToast color={toastColor} isOpen={isOpen}>
      <ContentToast direction="row" justify="space-between">
        <Flex direction="row" gap={3} align="center">
          <Icon color={titleAndIconColor} size={28} />

          <Flex>
            <Text size="2" weight="bold" color={titleAndIconColor}>
              {title}
            </Text>

            {description && (
              <Text size="1" weight="regular" color={descriptionColor}>
                {description}
              </Text>
            )}
          </Flex>
        </Flex>

        {hasButtonClose && (
          <Link
            color={descriptionColor}
            onClick={() => {
              closeToast();
            }}
          >
            Fechar
          </Link>
        )}
      </ContentToast>
    </ContainerToast>
  );
}
