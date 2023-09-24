import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
      //console.log(res.data)
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
      await axios.delete(`${rootDB}/delete-employee/${id}`);
      //console.log("successfully deleted");
      getEmployees();
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };


/////////////// MODAL AND UPDATE EMPLOYEE ///////////////
  const [show, setShow] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState([]);

  const [updateEmployeeData,setUpdateEmployeeData] = useState({
    employeeName:"",
    employeeAge:0,
    employeeCountry:"",
    employeePosition:"",
    employeeWage:0,
  })

  const handleUpdateInput = (e) => {
    setUpdateEmployeeData(prev=>({...prev,[e.target.name]: e.target.value}));
  }

  const handleClose = () => {
    setSelectedEmployee([]);
    setShow(false)
  }

  const handleShowEmployeeDetails = (employeeId) => {
    const selectedEmp = employeeList.find((employee) => employee.id === employeeId)

    setSelectedEmployee(selectedEmp)

    setUpdateEmployeeData({
      employeeName: selectedEmp.name,
      employeeAge: selectedEmp.age,
      employeeCountry: selectedEmp.country,
      employeePosition: selectedEmp.position,
      employeeWage: selectedEmp.wage,
    });

    setShow(true)

  };

  const handleUpdateEmployee = async (id)=>{

    try {
      await axios.put(rootDB + "/update-employee/" + id, updateEmployeeData);
      window. location. reload();
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='App'>

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

      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Employee Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="employeeName">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Name"
                defaultValue={selectedEmployee.name}
                name="employeeName"
                onChange={handleUpdateInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeeAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Age"
                defaultValue={selectedEmployee.age}
                name="employeeAge"
                onChange={handleUpdateInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeeCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                defaultValue={selectedEmployee.country}
                name="employeeCountry"
                onChange={handleUpdateInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeePosition">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                placeholder="Position"
                defaultValue={selectedEmployee.position}
                name="employeePosition"
                onChange={handleUpdateInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeeWage">
              <Form.Label>Wage</Form.Label>
              <Form.Control
                type="text"
                placeholder="Wage"
                defaultValue={selectedEmployee.wage}
                name="employeeWage"
                onChange={handleUpdateInput}/>
            </Form.Group>
          </Form>
        </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={()=>{handleUpdateEmployee(selectedEmployee.id)}}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </>

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
            <button onClick={()=>{handleShowEmployeeDetails(value.id)}}>
              Update Employee Details
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
