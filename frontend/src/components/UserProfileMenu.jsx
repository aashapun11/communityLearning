import React from "react";
import {
  Menu,
  Avatar,
  Button,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function UserProfileMenu({ user, logout }) {
  return (
    <Menu.Root positioning={{ placement: "bottom-end" }}>
      <Menu.Trigger asChild>
        <Button
          variant="ghost"
          p={0}
          rounded="full"
          _hover={{ bg: "gray.100" }}
        >
          <Avatar.Root size="sm">
            <Avatar.Fallback name={user?.name} />
            {user?.avatar && <Avatar.Image src={user.avatar} />}
          </Avatar.Root>
        </Button>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="220px">
            <VStack align="start" p={3} gap={0}>
              <Text fontWeight="bold">{user?.name}</Text>
              <Text fontSize="sm" color="gray.500">
                {user?.email}
              </Text>
            </VStack>

            <Menu.Separator />

            <Menu.Item
              value="profile"
              as={RouterLink}
              to="/profile"
            >
              Profile
            </Menu.Item>

            <Menu.Item
              value="settings"
              as={RouterLink}
              to="/settings"
            >
              Settings
            </Menu.Item>

            <Menu.Separator />

            <Menu.Item
              value="logout"
              color="red.500"
              onSelect={logout}
            >
              Logout
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

export default UserProfileMenu;