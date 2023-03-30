import { Global } from '@mantine/core'
import righteous from './Righteous-Regular.ttf'

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Righteous',
            // src: "url('https://fonts.googleapis.com/css2?family=Righteous&display=swap')",
            src: `url('${righteous}') format("ttf")`,
            fontWeight: 400,
            fontStyle: 'Regular',
          },
        },
      ]}
    />
  )
}
