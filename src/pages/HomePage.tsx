import theme from "../theme/theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ResponsiveLayout from "../components/ResponsiveLayout";
import GameDetails from "./GameDetails";

const App = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<ResponsiveLayout />} />
            <Route path="/game/:id" element={<GameDetails />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  );
};

export default App;
