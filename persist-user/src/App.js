import './App.css';
import Post from './components/Post/post';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about/*" element={<About/>}/>
          <Route />
          <Route path='/post' element = {<Post />} />
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
