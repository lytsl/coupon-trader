import './blob.css'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type ContentLayoutProps = {
  children: React.ReactNode
}

export function Blob({ children }: ContentLayoutProps) {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  })
  useEffect(() => {
    const mouseMove = (e: any) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener('mousemove', mouseMove)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
    }
  }, [])

  return (
    <>
      <motion.div
        id="blob"
        animate={{ left: mousePosition.x, top: mousePosition.y }}
        transition={{
          duration: 3,
          type: 'tween',
          ease: 'easeInOut',
        }}
      />
      <div id="blur"></div>
      <div id="children">{children}</div>
    </>
  )
}
