import React from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProductList(props) {
  if (props.loading === true) {
    return <div>Loanding....</div>;
  }
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Content</th>
          <th>Category</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.products?.map((product) => {
          return (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.content}</td>
              <td>{product.categoryName}</td>
              <td>{product.status}</td>
              <td>
                <Link to={`/update-product/${product.id}`}>
                  <Button variant="primary">
                    <FaEdit />
                    <span>Edit</span>
                  </Button>
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default ProductList;
