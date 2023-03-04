import { useForm, UseFormReturnType } from '@mantine/form'
import {
  Box,
  TextInput,
  Button,
  Group,
  LoadingOverlay,
  Title,
  Space,
} from '@mantine/core'
import { Avatar } from '@mantine/core'
import { atom, useAtom } from 'jotai'
import { useRegister } from 'lib/auth'
import { useNavigate } from 'react-router-dom'
import { Navbar } from 'features/user/components/Navbar'
import { Profile } from './components/Profile'
import { ChangePassword } from './components/ChangePassword'

// TODO fetch placeholder values from database as from register..............................
export function Dashboard() {
  return (
    <>
      <Navbar />
      <ChangePassword />
      <Profile />
    </>
  )
}
