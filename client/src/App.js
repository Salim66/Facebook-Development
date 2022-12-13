import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Profile from './pages/Profile/Profile';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { createToast } from './utility/toast';
import Activation from './pages/Activation/Activation';
import Forgot from './pages/Forgot/Forgot';
import FindAccount from './pages/FindAccount/FindAccount';
import Password from './pages/Password/Password';

function App() {
  return (
    <>
      <ToastContainer 
      style={{ zIndex: 99999 }}
      hideProgressBar={true}
      position="top-center"
      autoClose={3000}
      newestOnTop={true}
      />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Auth /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/activation/:type" element={ <Activation /> } />
        <Route path="/forgot" element={ <Forgot /> } />
        <Route path="/find-account" element={ <FindAccount /> } />
        <Route path="/change-password" element={ <Password /> } />
      </Routes>
    </>
  );
}

export default App;
