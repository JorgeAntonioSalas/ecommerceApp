import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasesThunk } from "../store/slices/purchases.slice";
import { Col, Image, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const purchases = useSelector(state => state.purchasesSlice);

    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, []);

    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };

    // Establece el idioma en inglés
    window.intl = {
        DateTimeFormat: function(locale, options) {
            return new Intl.DateTimeFormat('en-US', options);
        }
    };

    // Invierte el orden de las compras
    const reversedPurchases = purchases.slice().reverse();

    return (
        <div>
            <h1>PURCHASES</h1>
            <ListGroup>
                {/* Títulos */}
                <ListGroup.Item variant="dark">
                    <Row>
                        <Col md={2}><strong>Date</strong></Col>
                        <Col md={1}><strong>Purchase ID</strong></Col>
                        <Col md={2}><strong>Product</strong></Col>
                        <Col md={1}><strong>Description</strong></Col>
                        <Col md={1}></Col>
                        <Col md={2}><strong>Unit Price</strong></Col>
                        <Col md={1}><strong>Quantity</strong></Col>
                        <Col md={2}><strong>Total Price</strong></Col>
                        
                    </Row>
                </ListGroup.Item>
                {reversedPurchases.map(po => (
                    <ListGroup.Item key={po.id} onClick={() => navigate(`/products/${po.product.id}`)}>
                        <Row>
                            <Col md={2}>{new Date(po.createdAt).toLocaleString(undefined, dateOptions)}</Col>
                            <Col md={1}>{po.id}</Col>
                            <Col md={2}>{po.product.title}</Col>
                            <Col md={1}><Image src={po.product.images[0].url} fluid /></Col>
                            <Col md={1}></Col>
                            <Col md={2}>{po.product.price}</Col>
                            <Col md={1}>{po.quantity}</Col>
                            <Col md={2}>{(po.quantity * po.product.price).toFixed(2)}</Col>
                            <Col></Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default Favorites;


