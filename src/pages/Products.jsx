import React, { useEffect, useState } from "react";
import { FaBriefcase, FaHome } from "react-icons/fa";
import "./Products.scss";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import { deleteProduct, fetchProducts } from "../actions/productActions";
import ProductList from "../components/ProductList";
import { Link } from "react-router-dom";

function Products(props) {
  //   const [products, setProducts] = useState([]);
  //   const apiUrl = "http://localhost:3000/products";

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       try {
  //         const res = await axios.get(apiUrl);
  //         const products = res && res.data ? res.data : [];
  //         setProducts(products);
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     };
  //     fetchProducts();
  //   }, []);

  useEffect(() => {
    props.fetchProducts();
  }, []);

  const handleShowAll = () => {
    props.fetchProducts();
  };
  const handleShowNew = () => {
    let status = "new";
    props.fetchProducts(status);
  };
  const handleShowActive = () => {
    let status = "active";
    props.fetchProducts(status);
  };
  const handleShowInActive = () => {
    let status = "inActive";
    props.fetchProducts(status);
  };

  return (
    <div>
      <div className="navigation">
        <ul>
          <li>
            <a href="#home">
              <span className="icon">
                <FaHome style={{ fontSize: "22px" }} />
              </span>
              <span className="menu-title">Admin</span>
            </a>
          </li>
          <li>
            <a href="#manage-product">
              <span className="icon">
                <FaBriefcase style={{ fontSize: "22px" }} />
              </span>
              <span className="menu-title">Product</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <Row>
          <h1 className="title">Product Management</h1>
        </Row>
        <Row>
          <Col className="d-flex flex-row-reverse">
            <Link to="/create-product">
              <Button variant="info">Add New Product</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" onClick={() => handleShowAll()}>
              All
            </Button>{" "}
            <Button variant="success" onClick={() => handleShowNew()}>
              New
            </Button>{" "}
            <Button variant="primary" onClick={() => handleShowActive()}>
              Active
            </Button>{" "}
            <Button variant="secondary" onClick={() => handleShowInActive()}>
              InActive
            </Button>{" "}
          </Col>
          <Col>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />

              <Button variant="outline-success">Search</Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <ProductList
            loading={props.loading}
            products={props.products}
            deleteProduct={props.deleteProduct}
          />
        </Row>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.productReducer.loading,
    products: state.productReducer.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (status) => dispatch(fetchProducts(status)),
    deleteProduct: (id) => dispatch(deleteProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
