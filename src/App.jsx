import { Hero } from './components/Hero';
import Login from './components/Login';
import { Navbar } from './components/Navbar';
import Signin from './components/Signin';

function App() {
  return (
    <>
      <Navbar fluid/>
      <Hero fluid/>
      <Signin fluid/>
      <Login fluid/>
    </>
  );
}
export default App;