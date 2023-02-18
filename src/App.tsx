import { useState } from 'react'
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { SignIn } from './components/SignIn'

function App() {
  const preferredColorScheme =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme)
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Navbar />
        <Hero />
        <SignIn />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
export default App