import React, { useState } from 'react';

import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';


export function UpdateEmployee({ employee, handleShow, handleClose}) {

  const rootDB = "http://localhost:5001"

  const [updatedEmployee, setUpdatedEmployee] = useState(employee);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedEmployee({
      ...updatedEmployee,
      [name]: value,
    });
  };

  const handleUpdate = (id) => {
    axios.put(`${rootDB}/update-employee`,{})
  }
  
  return (
    <>
<Modal centered show={handleShow} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="employeeName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={updatedEmployee.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeeAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Age"
                name="age"
                value={updatedEmployee.age}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeeCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                name="country"
                value={updatedEmployee.country}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeePosition">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                placeholder="Position"
                name="position"
                value={updatedEmployee.position}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeeWage">
              <Form.Label>Wage</Form.Label>
              <Form.Control
                type="text"
                placeholder="Wage"
                name="wage"
                value={updatedEmployee.wage}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update Details
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateEmployee