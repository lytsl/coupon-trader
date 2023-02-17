import { useState } from 'react'
import { MantineProvider, ColorSchemeProvider } from '@mantine/core'

import { Hero } from './components/Hero'
import { Login } from './components/Login'
import { Navbar } from './components/Navbar'
import { SignIn } from './components/SignIn'

function App () {
  const preferredColorScheme =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  const [colorScheme, setColorScheme] = useState(preferredColorScheme)
  const toggleColorScheme = value => {
    console.log(value)
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  }

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
        <Navbar fluid />
        <Hero fluid />
        <SignIn fluid />
        <Login fluid />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
export default App
