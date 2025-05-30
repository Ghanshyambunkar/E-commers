import React, { useEffect } from 'react';
import './ProductDetails.css';
import Carousel from 'react-bootstrap/Carousel';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails } from '../../feature/Product/productDetailsSlice';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import ReviewCard from './ReviewCard';
import Loader from '../layout/Loader/Loader';

function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if(error){
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="ProductDetails">
            {/* Carousel with interval and caption */}
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <Carousel.Item key={item.url} interval={1500}>
                      <img
                        className="d-block w-100 CarouselImage"
                        src={item.url}
                        alt={`Slide ${i + 1}`}
                      />
                      <Carousel.Caption>
                        <h3>{product.name}</h3>
                        <p>{product.description?.slice(0, 100) || 'Product image'}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            {/* Product Info */}
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>

              <div className="detailsBlock-2">
                <Rating
                  name="read-only"
                  value={product.rating || 0}
                  precision={0.5}
                  size={window.innerWidth < 600 ? 'small' : 'medium'}
                  readOnly
                />
                <span>({product.numOfReviews || 0} Reviews)</span>
              </div>

              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input value="1" type="number" readOnly />
                    <button>+</button>
                  </div>
                  <button>Add to Cart</button>
                </div>
                <p>
                  Status:
                  <b className={product.stock < 1 ? 'redColor' : 'greenColor'}>
                    {product.stock < 1 ? 'OutOfStock' : 'InStock'}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
              </div>

              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          <h3 className='reviewsHeading'>REVIEWS</h3>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <p className='noReviews'>No Reviews Yet</p>
          )}

        </>
      )}
    </>
    
  );
}

export default ProductDetails;
