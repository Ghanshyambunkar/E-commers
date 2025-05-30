import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProducts } from '../../feature/Product/productSlice';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import './Products.css'
function Products() {
    const dispatch = useDispatch();

    const {products, loading, error, productsCount} = useSelector(
        (state)=>state.products
    );

    useEffect(() => {
        dispatch(getProducts());
    },[dispatch]);

  return (
    <>
        {loading ? <Loader /> : 
            <>
                <h2 className='productsHeading'>Products</h2>

                <div className="products">
                    {products && 
                        products.map((product) => (
                            <ProductCard key={product._id} product={product}/>
                        ))
                    }
                </div>
            </>
        }
    </>
  )
}

export default Products
