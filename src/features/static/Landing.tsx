import { Layout } from 'components/Layout'
import storage from 'lib/storage'
import { useNavigate } from 'react-router-dom'
import { Faq } from './components/Faq'
import { Features } from './components/Features'
import { Hero } from './components/Hero'
import { Blob } from './components/Blob'

export const Landing = () => {
  const navigate = useNavigate()
  // storage.clearToken()
  const auth = storage.getToken() == null ? false : true

  // const handleStart = () => {
  //   if (tempUser) {
  //     navigate('/app')
  //   } else {
  //     navigate('/auth/login')
  //   }
  // }

  return (
    <Blob>
      <Layout hasLoggedIn={auth}>
        <Hero hasLoggedIn={auth} />
        <Features />
        <Faq />
      </Layout>
    </Blob>
  )
}
export {}
