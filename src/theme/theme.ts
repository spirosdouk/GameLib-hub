import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config:ThemeConfig={
    initialColorMode:'light',
    useSystemColorMode:false,
};

const styles ={
    global: (props: any) => ({
        body: {
          bg: props.colorMode === 'light' ? 'gray.100' : 'gray.800',
          color: props.colorMode === 'light' ? 'black' : 'white',
        },
      }),
}

const theme = extendTheme({ config, styles });

export default theme;
