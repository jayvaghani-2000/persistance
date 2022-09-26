import './App.css';
import Post from './components/Post/post';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Home from './components/Home';
import Counter from './components/Counter';
import { Provider } from 'react-redux'
import store from './store/store';
import SignUp from './components/SignUp';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Counter />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about/*" element={<About />} />
            <Route path='/post/*' element={<Post />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
