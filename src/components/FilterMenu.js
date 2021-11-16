import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function FilterMenu({ onChange, value }) {
  return (
    <Menu closeOnSelect={true} ml="auto">
      <MenuButton icon={<SearchIcon />} as={IconButton}></MenuButton>
      <MenuList>
        <MenuOptionGroup
          defaultValue="all"
          title="Filter"
          type="radio"
          onChange={onChange}
          value={value}
        >
          <MenuItemOption value="all">All</MenuItemOption>
          <MenuItemOption value="active">Active</MenuItemOption>
          <MenuItemOption value="completed">Completed</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
