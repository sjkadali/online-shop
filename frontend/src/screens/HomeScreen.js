import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

function HomeScreen() {

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
 const dispatch = useDispatch();
  useEffect(() => {    
    dispatch(listProducts({}));    
  }, [dispatch, userInfo]);
    return (  
      <div>
          {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          { products.length === 0 &&  <MessageBox>No Product Found</MessageBox> }
            <div className="row center">
                {products.map((product) => (
              <Product key={product._id} product={product}></Product>
              ))}
            </div>            
        </>
      )}
      </div>
         
    )
}
export default HomeScreen;