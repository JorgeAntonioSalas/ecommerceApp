import { Offcanvas } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
const CartSidebar = ({show, handleClose}) => {
    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    );
};

export default CartSidebar;