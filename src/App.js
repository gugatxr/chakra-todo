import { useState, useMemo } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  FormControl,
  VStack,
  Text,
  IconButton,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import usePersistedState from "./hooks/usePersistedState";
import usePersistedReducer from "./hooks/usePersistedReducer";
import TodoItem from "./components/TodoItem";
import BottomNav from "./components/BottomNav";
import FilterMenu from "./components/FilterMenu";
import { v4 as uuidv4 } from "uuid";

const newTodo = (description) => ({
  id: uuidv4(),
  completed: false,
  description,
});

const INITIAL_STATE = [newTodo("Buy milk"), newTodo("Buy coffee")];

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO": {
      return [...state, newTodo(action.payload)];
    }
    case "REMOVE_TODO": {
      return state.filter((todo) => todo.id !== action.payload);
    }
    case "TOGGLE_COMPLETED_TODO": {
      return state.map((todo) => {
        if (todo.id !== action.payload) return todo;

        todo.completed = !todo.completed;
        return todo;
      });
    }
    default:
      throw new Error("No valid type");
  }
}

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const [todoInput, setTodoInput] = useState("");
  const [todoFilter, setTodoFilter] = usePersistedState("@todo/filter", "all");
  const [todos, dispatch] = usePersistedReducer(
    "@todo/todos",
    reducer,
    INITIAL_STATE
  );

  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.completed),
    [todos]
  );

  const todosAfterFilter = useMemo(() => {
    switch (todoFilter) {
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "active":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }, [todos, todoFilter]);

  const addTodo = (event) => {
    event.preventDefault();

    if (!todoInput) return;

    dispatch({ type: "ADD_TODO", payload: todoInput });

    setTodoInput("");

    toast({
      title: "Task add with success",
      status: "success",
      isClosable: true,
    });
  };

  const onCompleteClick = (index) => {
    dispatch({ type: "TOGGLE_COMPLETED_TODO", payload: index });
  };

  const onRemoveClose = (index) => {
    dispatch({ type: "REMOVE_TODO", payload: index });
  };

  return (
    <Box as="main" minH="100vh">
      <Box
        as="section"
        maxW="500"
        mx="auto"
        borderColor="gray.200"
        p="3"
        h="100vh"
        display="flex"
        flexDirection="column"
      >
        <Box
          as="header"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb="5"
        >
          <Heading textAlign="center">TODO App</Heading>
          <Box>
            <FilterMenu
              onChange={(value) => setTodoFilter(value)}
              value={todoFilter}
            />
            <Button onClick={toggleColorMode} ml="2">
              {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            </Button>
          </Box>
        </Box>
        <Box>
          <form onSubmit={addTodo}>
            <FormControl id="todo">
              <Box display="flex">
                <Input
                  autoComplete="off"
                  placeholder="Add new item"
                  value={todoInput}
                  onChange={(e) => setTodoInput(e.target.value)}
                />
                <IconButton
                  type="submit"
                  aria-label="Insert todo"
                  ml="3"
                  icon={<AddIcon />}
                />
              </Box>
            </FormControl>
          </form>
        </Box>

        <VStack flexGrow="1" align="stretch" pt="3" overflow="auto">
          {todosAfterFilter.map((todo, index) => (
            <TodoItem
              key={todo.id}
              index={index}
              todo={todo}
              onCompleteClick={onCompleteClick}
              onRemoveClose={onRemoveClose}
            />
          ))}

          {todosAfterFilter.length === 0 ? <Text>You have 0 todos</Text> : null}
        </VStack>

        <BottomNav
          completedTodosAmount={completedTodos.length}
          total={todos.length}
        />
      </Box>
    </Box>
  );
}

export default App;
