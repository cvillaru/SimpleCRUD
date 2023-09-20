import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

import { Modal, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const rootDB = "http://localhost:5001"

  const [employeeList, setEmployeeList] = useState([])

  const [employee,setEmployee] = useState({
    name:"",
    age:0,
    country:"",
    position:"",
    wage:0,
  })

  const getEmployees = async()=>{
    try{
      const res = await axios.get(rootDB+"/employees")
      console.log(res.data)
      setEmployeeList(res.data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getEmployees()
  },[])


  const handleChange = (e)=>{
    setEmployee(prev=>({...prev,[e.target.name]: e.target.value}));
  }

  const handleAddEmployee = async e =>{
    e.preventDefault()
    try {
      await axios.post(rootDB+"/create", employee)
      getEmployees()
      window. location. reload();
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteEmployee = async (id) => {
    try {
      console.log(id);
      await axios.delete(`${rootDB}/delete-employee/${id}`);
      console.log("successfully deleted");
      getEmployees();
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };


  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedEmployee, setUpdatedEmployee] = useState({
    name: "",
    age: 0,
    country: "",
    position: "",
    wage: 0,
  });


  const handleShowUpdateModal = () => {
    setShowUpdateModal(true);
  };
  
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };


  const handleUpdateEmployee = async (id) => {
    // try {
    //   // Make an API call to update the employee data with updatedEmployee
    //   await axios.put(`${rootDB}/update-employee/${employeeId}`, updatedEmployee);
    //   // Close the modal
    //   handleCloseUpdateModal();
    //   // Fetch the updated employee list
    //   getEmployees();
    // } catch (error) {
    //   console.error("ERROR: ", error);
    // }
  };


  return (
    <div className='App'>
      <Modal 
        centered
        show={showUpdateModal}
        onHide={handleCloseUpdateModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="employeeName">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Name"
                defaultValue={employee.name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeeAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Age"
                defaultValue={employee.age}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeeCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                defaultValue={employee.country}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeePosition">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                placeholder="Position"
                defaultValue={employee.position}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeeWage">
              <Form.Label>Wage</Form.Label>
              <Form.Control
                type="text"
                placeholder="Wage"
                defaultValue={employee.wage}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={()=>{handleUpdateEmployee(employee.id)}}
          >
            Update Details
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="information">
        <lable>Name: </lable>
        <input type="text" placeholder='Name' onChange={handleChange} name="name"/>
        <label>Age: </label>
        <input type="number" placeholder='Age' onChange={handleChange} name="age"/>
        <label>Country: </label>
        <input type="text" placeholder='Country' onChange ={handleChange}name="country"/>
        <label>Position: </label>
        <input type="text" placeholder='Position' onChange={handleChange} name="position"/>
        <label>Wage: </label>
        <input type="number" placeholder='Wage' onChange={handleChange} name="wage"/>
        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>


      {employeeList.map((value, key) => (
        <div className='employee-display-container' key={key}>
          <div className='employee-display-content'>
            <h3>Name: {value.name} </h3>
            <h3>Age: {value.age} </h3>
            <h3>Country: {value.country}</h3>
            <h3>Position: {value.position}</h3>
            <h3>Wage: {value.wage}</h3>
          </div>
          <div className='action-button-container'>
            <button onClick={handleShowUpdateModal}>
              Update Employee
            </button>
            <button onClick={()=>{handleDeleteEmployee(value.id)}}>
              Delete Employee
            </button>
          </div>
        </div>
      ))}
    </div>
    
  );
}

export default App;
