import React from "react";
import { Link } from "react-router-dom";

import Rating from '@mui/material/Rating';
function ProductCard ({product}) {
    return (
        <Link className="productCard" to={`/product/${product._id}`}>
            <img 
                src={product.images[0].url} 
                alt={product.name} 
            />

            <p>{product.name}</p>
            <div>
                <Rating
                    name="read-only"
                    value={product.rating}
                    precision={0.5}
                    size={window.innerWidth < 600 ? "small" : "medium"}
                    readOnly
                />

                <span>({product.numOfReviews} Reviews)</span>
            </div>
            <span>{`₹${product.price}`}</span>
        </Link>
    );
}

export default ProductCard;