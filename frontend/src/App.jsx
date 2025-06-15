import './App.css'
import Header from "./component/layout/header/Header.jsx"
import Footer from "./component/layout/footer/Footer.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home/Home.jsx';
import ProductDetails from './component/Product/ProductDetails.jsx';
import Products from './component/Product/Products.jsx';
import Search from './component/Product/Search.jsx';
import LoginSignUp from './User/LoginSignUp.jsx';

function App() {
 
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />

        <Route path='/products' element={<Products />}/>
        <Route path='/products/:keyword' element={<Products />}/>
        
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
