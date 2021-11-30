import { Box, Checkbox, CloseButton, Text } from "@chakra-ui/react";

export default function TodoItem({
  todo,
  index,
  onCompleteClick,
  onRemoveClose,
}) {
  return (
    <Box
      borderColor="gray.200"
      borderWidth="1px"
      borderStyle="solid"
      px="2"
      display="flex"
      alignItems="center"
      borderRadius="5"
    >
      <Checkbox
        isChecked={todo.completed}
        my="3"
        onChange={(e) => onCompleteClick(todo.id, e.target.checked)}
      />

      <Text ml="3" as={todo.completed ? "del" : "span"}>
        {todo.description}
      </Text>

      <CloseButton
        size="sm"
        ml="auto"
        onClick={() => onRemoveClose(todo.id)}
        title="Remove item"
      />
    </Box>
  );
}
