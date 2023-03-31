import { notifications } from '@mantine/notifications'
import { IconCheck, IconCircleCheck, IconX } from '@tabler/icons-react'

export function showError(message: string) {
  notifications.show({
    withCloseButton: true,
    autoClose: 5000,
    title: 'Error',
    message: message,
    color: 'red',
    icon: <IconX />,
  })
}

export function showSuccess(message: string) {
  notifications.show({
    withCloseButton: true,
    autoClose: 5000,
    title: 'Success',
    message: message,
    color: 'blue',
    icon: <IconCheck />,
  })
}
