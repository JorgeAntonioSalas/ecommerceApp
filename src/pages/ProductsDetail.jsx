import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "../App.css";
import { Col, ListGroup, ListGroupItem, Row, Button } from "react-bootstrap";
import { addProductThunk } from "../store/slices/cart.slice";

const ProductsDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.productsSlice);
  const [quantity, setQuantity] = useState(1);

  const productsDetail = productsList.find((posi) => posi.id === parseInt(id));
  const relatedProducts = productsList.filter(
    (po) => po.category.id === productsDetail.category.id
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    // Avanza a la siguiente imagen
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productsDetail.images.length);
  };

  const handlePrevImage = () => {
    // Retrocede a la imagen anterior
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? productsDetail.images.length - 1 : prevIndex - 1
    );
  };

  useEffect(()=> {
    setQuantity(1);
  },[id])


  // funcion para agregar productos al carro de compras
  const addProduct = ()=> {
    alert('Agregando '+quantity+' productos al carrito')
    const product= {
      "quantity": quantity,
      "productId": id,
    }
    dispatch(addProductThunk(product))
  }

  return (
    <Row>
      <Col>
        <div className="productsDetail">
          <h2> {productsDetail?.title} </h2>
          <div className="images_description">
            <img src={productsDetail?.images[currentImageIndex].url} height="400px" />
          </div>
          <div className="imageNavigation">
            <Button variant="outline-secondary" onClick={handlePrevImage}>
              Previous
            </Button>
            <Button variant="outline-secondary" onClick={handleNextImage}>
              Next
            </Button>
          </div>
          <br/>
          <div className="quantity">
            <Button className="me-3" onClick={()=>setQuantity(quantity-1)}>-</Button>
              {quantity}
            <Button className="ms-3" onClick={()=>setQuantity(quantity+1)}>+</Button>
           
            <Button className="ms-3" onClick={addProduct}>ADD to Cart</Button>
            
          </div>
          <br/>
          <p>
            <b>Category: </b> {productsDetail?.category.name}
          </p>
          <p>
            <b>Description: </b>
            {productsDetail?.description}
          </p>
          <p>
            <b>Price: </b>
            USD ${productsDetail?.price}
          </p>
        </div>
      </Col>
      <Col lg={2}>
        <h2> Related Products </h2>
        <ListGroup>
          {relatedProducts.map((positionProduct) => (
            <ListGroupItem key={positionProduct.id}>
              <Link className="relatedLink" to={`/products/${positionProduct.id}`}>
                <h4>
                  <b>{positionProduct.title}</b>
                </h4>
                <br />
                <img
                  className="img-fluid"
                  src={positionProduct.images[0].url}
                  alt={`Related Product`}
                />
              </Link>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default ProductsDetail;
