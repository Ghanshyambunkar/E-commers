import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProducts } from '../../feature/Product/productSlice';
import Product from './ProductCard';
import MouseIcon from '@mui/icons-material/Mouse';
import MetaData from '../MetaData';
import './Home.css';
import Loader from '../layout/Loader/Loader';

function Home() {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if(error) {
       alert(error);
       dispatch(clearErrors())
    }
    dispatch(getProducts({}));
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ECOMMERCE" />

          <div className="banner">
            <p>Welcome to E-COMMERCE</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#containr">
              <button>
                Scroll <MouseIcon />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="containr" id="containr">
            {products && products.length > 0 ? (
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
