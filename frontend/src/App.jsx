import { useState } from 'react'
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from './components/Navbar';
import {colors} from './theme/colors';

function App() {
  const [count, setCount] = useState(0)

  return (
     <Box minH="100vh" bg={colors.background}>
      <Navbar />
      <Outlet />
    </Box>
  )
}

export default App
