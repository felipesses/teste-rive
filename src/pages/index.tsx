import Drawer from "@/components/Drawer";
import { Text, Button, useDisclosure } from "@chakra-ui/react";

import Rive, { useRive, useStateMachineInput } from "@rive-app/react-canvas";

export default function Home() {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const { rive, RiveComponent } = useRive({
    src: "/rive/likert-proto.riv",
    autoplay: true,
    stateMachines: "State Machine 1",
    onStateChange: (event) => {
      console.log(event.data);
    },
  });

  const animationEvent = useStateMachineInput(rive);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "1000px",
        background: "white",
      }}
    >
      <Button h="100px" w="100px" bgColor="red" onClick={onOpen}>
        Open Drawer
      </Button>

      <Drawer
        direction="bottom"
        size="sm"
        isOpen={isOpen}
        onClose={onClose}
        withCloseButton
        titleComponent={
          <Text fontWeight="700" fontSize="24px" lineHeight="24px">
            Drawer
          </Text>
        }
      >
        <RiveComponent
          style={{
            height: "300px",
          }}
          onClick={() => {
            console.log("clicked");
            animationEvent && animationEvent.fire();
          }}
        />
      </Drawer>
    </div>
  );
}
