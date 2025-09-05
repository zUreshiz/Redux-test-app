import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { fetchProduct, updateProduct } from "../actions/productActions";

function UpdateProduct(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [content, setContent] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState("");

  const { fetchProduct, product } = props;
  const { productId } = useParams();

  // fetch product khi mount hoặc khi productId thay đổi
  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId, fetchProduct]);

  // khi props.product thay đổi => set lại state cho form
  useEffect(() => {
    if (props.product) {
      setName(props.product.name || "");
      setPrice(props.product.price || 0);
      setContent(props.product.content || "");
      setCategoryName(props.product.categoryName || "");
      setStatus(props.product.status || "");
    }
  }, [props.product]);

  const checkValidate = () => {
    let isValid = true;
    if (!name || !price || !content || !categoryName || !status) {
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

    props.updateProduct({
      id: productId,
      name: name,
      price: price,
      content: content,
      categoryName: categoryName,
      status: status,
    });

    setName("");
    setContent("");
    setPrice(0);
    setCategoryName("");
  };

  return props.loading ? (
    <div>Loading data...</div>
  ) : (
    <Container>
      <Row>
        <Col>
          <br />
          <h1>Update Product</h1>
        </Col>
      </Row>
      <br />

      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formProductId">
          <Form.Label column sm={2}>
            ID
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" value={productId} disabled />
          </Col>
        </Form.Group>

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

        <Form.Group as={Row} className="mb-3" controlId="formProductStatus">
          <Form.Label column sm={2}>
            Status
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter Product Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" variant="info" onClick={handleSaveProduct}>
              Save Change
            </Button>
          </Col>
        </Form.Group>
      </Form>
      {props.updateSuccess === true && <Navigate to="/manage-product" replace={true} />}

      {props.updateSuccess === false && props.updateErrorMessage && (
        <Alert variant="danger">
          <div>Error: {props.updateErrorMessage}</div>
        </Alert>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.productReducer.loading,
    product: state.productReducer.product,
    updateSuccess: state.productReducer.updateSuccess,
    updateErrorMessage: state.productReducer.updateErrorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProduct: (id) => dispatch(fetchProduct(id)),
    updateProduct: (product) => dispatch(updateProduct(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);
