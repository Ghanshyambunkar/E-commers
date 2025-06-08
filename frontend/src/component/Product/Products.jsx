import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProducts } from '../../feature/Product/productSlice';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import './Products.css';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

function Products() {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);

    const [price, setPrice] = useState([0, 25000]);

    const { products, loading, error, productsCount, resultPerPage } = useSelector(
        (state) => state.products
    );

    const { keyword = "" } = useParams();

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }

    useEffect(() => {
        dispatch(getProducts({ keyword, currentPage, price }));
    }, [dispatch, keyword, currentPage, price]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <h2 className="productsHeading">Products</h2>

                    {error && <p className="errorMessage">{error}</p>}

                    <div className="products">
                        {products && products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    <div className="filterBox">
                        <Typography >
                            Price
                        </Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            min={0}
                            max={25000}
                        />
                    </div>

                    {resultPerPage < productsCount && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default Products;
