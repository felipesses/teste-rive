import React, { useEffect } from "react";

import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";

interface DrawerProps {
  pageId?: string;
  children: React.ReactNode;
  isOpen: boolean;
  direction: "top" | "bottom" | "left" | "right";
  size: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  onClose: () => void;
  titleComponent?: React.ReactNode;
  withCloseButton?: boolean;
  footerComponent?: React.ReactNode;
  closeOnOverlayClick?: boolean;
  showHandleBar?: boolean;
}

export function Drawer({
  titleComponent,
  isOpen,
  direction,
  size,
  onClose,
  children,
  withCloseButton,
  footerComponent,
  closeOnOverlayClick = true,
  showHandleBar = true,
  pageId,
}: DrawerProps): JSX.Element {
  const lockDrawerFocus = (drawerId: string, pageFatherId: string) => {
    const page = document.getElementById(pageFatherId);
    page?.setAttribute("aria-hidden", "true");
    const element = document.getElementById(`chakra-modal-${drawerId}`);
    element?.setAttribute("aria-hidden", "false");
  };

  const cleanFocus = (pageFatherId: string) => {
    const page = document.getElementById(pageFatherId);
    page?.setAttribute("aria-hidden", "false");
  };

  useEffect(() => {
    if (isOpen && pageId) {
      lockDrawerFocus("globalDrawerId", pageId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = () => {
    if (pageId) {
      cleanFocus(pageId);
    }

    onClose();
  };

  return (
    <ChakraDrawer
      id="global-drawer"
      isOpen={isOpen}
      onClose={handleClose}
      size={size}
      placement={direction}
      closeOnOverlayClick={closeOnOverlayClick}
    >
      <DrawerOverlay />

      <DrawerContent
        aria-labelledby="title-header"
        paddingBottom={footerComponent !== undefined ? "0" : "18px"}
        borderRadius="16px 16px 0 0"
      >
        <DrawerHeader padding="0px 24px" id="global-header">
          <Box height="72px" bgColor="white">
            {withCloseButton ? (
              <DrawerCloseButton
                as="button"
                aria-label="Fechar"
                data-testid="drawer-close-button"
                bgColor="red"
                size="lg"
                outline="none"
                position="absolute"
                right="24px"
                top="30px"
                _hover={{
                  backgroundColor: "transparent",
                }}
                _active={{
                  backgroundColor: "transparent",
                }}
                _focus={{
                  boxShadow: "none",
                }}
              />
            ) : null}
            <Text
              id="title-header"
              as="h2"
              color="black"
              position="absolute"
              left="24px"
              top="37px"
            >
              {titleComponent}
            </Text>
          </Box>
        </DrawerHeader>

        <DrawerBody
          id="global-body"
          padding="0"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {children}
        </DrawerBody>

        {footerComponent ? (
          <DrawerFooter p="0" data-testid="footer-component">
            {footerComponent}
          </DrawerFooter>
        ) : null}
      </DrawerContent>
    </ChakraDrawer>
  );
}

export default Drawer;
