import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Card, Col, Row } from "react-bootstrap";
import "../App.css";

const Home = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.productsSlice);
  const [filteredProducts, setFilteredProducs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(()=> {
    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
    .then (res => setCategories(res.data));
  },[])

  useEffect(()=> {
    setFilteredProducs(products)
  },[products]);


  const filterCategories = (catId) =>{
    // alert('filtrando productos con categoria: '+catId);
    const filtered = products.filter(pos => pos.category.id === parseInt(catId))
    setFilteredProducs(filtered);
  }

  const toSearch = ()=>{
    // alert(`buscando ${searchValue}`);
    setFilteredProducs(products.filter( posi=>posi.title.toLowerCase().match(searchValue.toLowerCase().trim())))  
  }

  return (
    <div>
      <h1>HOME</h1>
        <select className='selectBox' onChange={e=>filterCategories(e.target.value)}>
        {/* <option value=''>Select a Category</option> */}
            { categories.map(posi => 
                <option value={posi.id}  key={posi.id}>{posi.name}</option> )}
        </select>

        <InputGroup className="mb-3">
        <Form.Control 
          placeholder="search products"
          type="text"
          value={searchValue}
          onChange={e=> setSearchValue(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={toSearch}>
          Button
        </Button>
      </InputGroup>

      

      <Row xs={1} md={2} className="g-4">
      {filteredProducts.map((positionProduct) => (
        <Col key={positionProduct.id}>
          <Card  onClick={() => navigate(`/products/${positionProduct.id}`)}
            >
            <Card.Img className="img-fluid img-home" variant="top"  src={positionProduct.images[0].url} />
            <Card.Body>
              <Card.Title>{positionProduct.title}</Card.Title>
              <Card.Text>
              Price: USD${positionProduct.price}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>


      
      {/* <ul>
        {filteredProducts.map((positionProduct) => (
          <li
            onClick={() => navigate(`/products/${positionProduct.id}`)}
            key={positionProduct.id}
          >
            <h2><b>{positionProduct.title}</b></h2>
            <br />
            <img width={"250px"} src={positionProduct.images[0].url}></img>
          </li>
        ))}
      </ul> */}



    </div>
  );
};

export default Home;
