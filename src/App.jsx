import { MantineProvider, Text } from '@mantine/core';
// import { Navbar } from './components/Navbar';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Text>Welcome to Mantine!</Text>
    </MantineProvider>
  );
}