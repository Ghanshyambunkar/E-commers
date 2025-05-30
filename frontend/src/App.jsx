import './App.css'
import Header from "./component/layout/header/Header.jsx"
import Footer from "./component/layout/footer/Footer.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home/Home.jsx';
import ProductDetails from './component/Product/ProductDetails.jsx';
import Products from './component/Product/Products.jsx';
function App() {
 
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />}/>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
