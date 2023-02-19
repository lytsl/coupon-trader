import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core'
import { Hero } from './components/Hero'
import { SignIn } from './components/SignIn'
import { Login } from './components/Login'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'

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
        <Login />
        <Footer />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
export default App
