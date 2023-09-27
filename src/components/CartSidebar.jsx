import { useEffect } from 'react';
import { ListGroup, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk, purchaseCartThunk } from '../store/slices/cart.slice';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const CartSidebar = ({show, handleClose}) => {

  const dispatch= useDispatch();
  const cartProducts = useSelector(state => state.cartSlice);

  useEffect(()=> {
    dispatch(getCartThunk());
  },[])

  console.log(cartProducts);

  const purchaseCart= ()=> {
    dispatch(purchaseCartThunk());
  } 

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            {
              cartProducts?.map(pos => 
                <ListGroup.Item key={pos.id}>
                  <Link to={`products/${pos.product.id}`}>{pos.product.title}</Link>  
                </ListGroup.Item>)
            }
          </ListGroup>
          <button onClick={purchaseCart}>Purchase</button>
        </Offcanvas.Body>
      </Offcanvas>
    );
};

export default CartSidebar;