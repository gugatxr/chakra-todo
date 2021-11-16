import { Flex, useColorModeValue } from "@chakra-ui/react";

export default function BottomNav({ completedTodosAmount = 0, total = 0 }) {
  const backgroundColor = useColorModeValue("white", "gray.800");

  return (
    <Flex p="3" bg={backgroundColor} w="100%" boxShadow="sm">
      You have {total} todos and {completedTodosAmount} completed{" "}
      {total === completedTodosAmount ? "🎉" : ""}
    </Flex>
  );
}
