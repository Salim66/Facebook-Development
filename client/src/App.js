import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Profile from './pages/Profile/Profile';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { createToast } from './utility/toast';

function App() {
  return (
    <>
      <ToastContainer 
      hideProgressBar={true}
      position="top-center"
      autoClose={3000}
      newestOnTop={true}
      />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Auth /> } />
        <Route path="/profile" element={ <Profile /> } />
      </Routes>
    </>
  );
}

export default App;
