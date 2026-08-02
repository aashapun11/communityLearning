import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from './components/Navbar';
import {colors} from './theme/colors';
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";

function App() {

  return (
     <Box  bg={colors.background}>
      <Navbar />
      <Flex>
        <LeftSidebar />
        <Box flex="1">
          <Outlet />
        </Box>
        <RightSidebar />
      </Flex>
    </Box>
  )
}

export default App
