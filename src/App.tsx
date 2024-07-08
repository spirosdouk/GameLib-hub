import ResponsiveLayout from "./components/ResponsiveLayout";
import theme from "./theme/theme";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <>
      {" "}
      <ChakraProvider theme={theme}>
        <ResponsiveLayout />;{" "}
      </ChakraProvider>
    </>
  );
};

export default App;
