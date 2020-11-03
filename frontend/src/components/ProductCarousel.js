import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { listTopProducts } from '../actions/productActions';
import Message from './Message';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (state) => state.productTopRating
  );

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item>
          <Link to={`/product/${product._id}`}></Link>
          <Image src={product.image} alt={product.name} fluid />
          <Carousel.Caption className="carousel-caption">
            <h2>
              {product.name} ({product.price})
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
