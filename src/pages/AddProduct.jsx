import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { createProduct } from "../actions/productActions";
import { Navigate } from "react-router-dom";

function AddProduct(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [content, setContent] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState("");

  const checkValidate = () => {
    let isValid = true;
    if (!name || !price || !content || !categoryName) {
      return (isValid = false);
    }
    return isValid;
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();

    let isValid = checkValidate();

    if (isValid === false) {
      alert("Field must required");
      return;
    }

    //
    props.createProduct({
      name: name,
      price: price,
      content: content,
      categoryName: categoryName,
      status: "New",
    });

    setName("");
    setContent("");
    setPrice(0);
    setCategoryName("");
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Create New Product</h1>
        </Col>
      </Row>
      <br />

      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formProductName">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formProductPrice">
          <Form.Label column sm={2}>
            Price
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              placeholder="Enter Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formProductContent">
          <Form.Label column sm={2}>
            Content
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter Product Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formProductCategory">
          <Form.Label column sm={2}>
            Category
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter Product Category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" variant="info" onClick={handleSaveProduct}>
              Save Product
            </Button>
          </Col>
        </Form.Group>
      </Form>
      {props.createSuccess === true && <Navigate to="/manage-product" replace={true} />}

      {props.createSuccess === false && props.createErrorMessage && (
        <Alert variant="danger">
          <div>Create Error: {props.createErrorMessage}</div>
        </Alert>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    createSuccess: state.productReducer.createSuccess,
    createErrorMessage: state.productReducer.createErrorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProduct: (product) => dispatch(createProduct(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
