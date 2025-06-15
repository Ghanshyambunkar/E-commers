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
import MetaData from '../MetaData';

const categories = [
    "Laptop",
    "SmartPhones",
    "Cemera",
    "Footwear",
];

function Products() {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);

    const [price, setPrice] = useState([0, 50000]);

    const [category, setCategory] = useState("");

    const [rating, setRating] = useState(0);

    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount} = useSelector(
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
        if(error){
            alert(error);
            dispatch(clearErrors());
        }
        dispatch(getProducts({ keyword, currentPage, price, category, rating }));
    }, [dispatch, keyword, currentPage, price, category, rating, error]);

    let count = filteredProductsCount;

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="PRODUCTS -- ECOMMERCE" />

                    <h2 className="productsHeading">Products</h2>

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
                            max={50000}
                        />

                        <Typography variant="h6" gutterBottom>
                            Categories
                        </Typography>
                        <ul className='categoryBox'>
                        {categories.map((category) => (
                            <li
                            className='category-link'
                            key={category}
                            onClick={() => setCategory(category)}
                            >
                            {category}
                            </li>
                        ))}
                        </ul>

                        <fieldset className="ratingFilter">
                            <legend className="ratingLegend">
                                <Typography variant="h6" component="legend">Ratings Above</Typography>
                            </legend>
                            <Slider 
                                value={rating}
                                onChange={(e, newRating) => {
                                    setRating(newRating);
                                }}
                                aria-labelledby='continuous-slider'
                                valueLabelDisplay='auto'
                                min={0}
                                max={5}
                                sx={{
                                    color: '#f39c12',
                                }}/>
                        </fieldset>
                    </div>

                    {resultPerPage < count && (
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
