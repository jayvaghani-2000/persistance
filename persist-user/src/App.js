import './App.css';
import Post from './components/Post/post';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Home from './components/Home';
import Counter from './components/Counter';
import { Provider, useDispatch } from 'react-redux'
import store from './store/store';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { useEffect } from 'react';
import { autoLogin } from './store/authSlice';

function App() {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if(location.pathname.includes("/post")) return
    autoLogin(dispatch)
  }, [])

  return (
    <>
      <Header />
      <Counter />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about/*" element={<About />} />
          <Route path='/post/*' element={<Post />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
