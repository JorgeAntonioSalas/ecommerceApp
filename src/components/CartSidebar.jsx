import { useEffect } from 'react';
import { ListGroup, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk, purchaseCartThunk, removeProductCartThunk } from '../store/slices/cart.slice';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const CartSidebar = ({show, handleClose}) => {

  const dispatch= useDispatch();
  const cartProducts = useSelector(state => state.cartSlice);

  useEffect(()=> {
    dispatch(getCartThunk());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // console.log(cartProducts);

  const purchaseCart= ()=> {
    dispatch(purchaseCartThunk());
  } 

  const removeProduct = (data) => {
    dispatch(removeProductCartThunk(data.id))
    // alert ('removiendo '+data.product.title)
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
                  <button onClick={()=> removeProduct(pos)}> <i className="fa-solid fa-trash-can"></i> </button>
                </ListGroup.Item>)
            }
          </ListGroup>
          <br/> <br/>
          <button onClick={purchaseCart}>Purchase All <i className="fa-regular fa-square-check"></i></button>
        </Offcanvas.Body>
      </Offcanvas>
    );
};

export default CartSidebar;