import { useNavigate } from 'react-router-dom'

// import { useAuth } from 'lib/auth'

export const Landing = () => {
  const navigate = useNavigate()
  // const { user } = useAuth()
  const tempUser = false

  const handleStart = () => {
    if (tempUser) {
      navigate('/app')
    } else {
      navigate('/auth/login')
    }
  }

  return <></>
}
export {}
