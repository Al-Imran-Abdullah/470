import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import SelfCare from './pages/SelfCare';
import MentalHealth from './pages/MentalHealth';
import Settings from './pages/Settings';
import SignUp from './pages/SignUp';
import AuthProvider from './context/AuthProvider';
import PrivateOutlet from './components/PrivateOutlet'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />

        <Route path='/' element={<PrivateOutlet />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/self-care' element={<SelfCare />} />
          <Route path='/mental-health' element={<MentalHealth />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/settings' element={<Settings />} />
        </Route>

      </Routes>
    </AuthProvider>
  );
}

export default App;
