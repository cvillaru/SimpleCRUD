import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const rootDB = "http://localhost:5001";

  
/////////////// ALERTS ///////////////
  const [showAlertModal,setShowAlertModal] = useState(false);
  const handleCloseAlertModal = () => setShowAlertModal(false);

///////////////

  const [employeeList, setEmployeeList] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteEmployee, setDeleteEmployee] = useState([]);
  const [deleteEmployeeData,setDeleteEmployeeData] = useState({
    employeeName:"",
    employeeAge:0,
    employeeCountry:"",
    employeePosition:"",
    employeeWage:0,
  })


  const [employee,setEmployee] = useState({
    name:"",
    age:0,
    country:"",
    position:"",
    wage:0,
  });


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
      if(
        (employee.name === "" || employee.name === null) ||
        (employee.country === "" || employee.country === null) ||
        (employee.position === "" || employee.position === null)){
          return setShowAlertModal(true);
          //return console.error("Invalid Input");
      }
      if(
        (employee.age <= 0 || employee.age === null) ||
        (employee.wage <= 0 || employee.wage === null)){
          return setShowAlertModal(true);
          //return console.error("Invalid wage");
      }


      await axios.post(rootDB+"/create", employee)
      getEmployees()
      window. location. reload();
    } catch (error) {
      console.log(error)
    }
  }

  const handleCloseConfirmDeletion = () => {
    setShowDeleteModal(false)
  }

  const handleShowConfirmDeletion = (employeeId) =>{
    const deleteEmp = employeeList.find((employee) => employee.id === employeeId);
    setDeleteEmployee(deleteEmp);

    setDeleteEmployeeData({
      employeeName: deleteEmp.name,
      employeeAge: deleteEmp.age,
      employeeCountry: deleteEmp.country,
      employeePosition: deleteEmp.position,
      employeeWage: deleteEmp.wage,
    });
    setShowDeleteModal(true);
  }

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`${rootDB}/delete-employee/${id}`);
      getEmployees();
      handleCloseConfirmDeletion();
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };


/////////////// MODAL AND UPDATE EMPLOYEE ///////////////
  const [showUpdateModal, setShowUpdateModal] = useState(false)
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
    setShowUpdateModal(false)
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

    setShowUpdateModal(true)

  };

  const handleUpdateEmployee = async (id)=>{

    try {
      await axios.put(rootDB + "/update-employee/" + id, updateEmployeeData);
      window. location. reload();
    } catch (error) {
      console.log(error)
    }
  }

///////////////

  return (
    <div className='App'>
      <>
        <Modal
          show={showAlertModal}
          onHide={handleCloseAlertModal}
          backdrop="static"
          keyboard={false}
        >
          <Alert variant="danger">
            <Alert.Heading>Invalid Input(s)</Alert.Heading>
            <p>
              Ensure all inputs are filled in.
            </p>
          </Alert>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseAlertModal}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </>

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
          show={showUpdateModal}
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

      <>
        <Modal
          show={showDeleteModal}
          onHide={handleCloseConfirmDeletion}
          backdrop="static"
          keyboard={false}
          animation={false}
          centered
        >
          <Modal.Header
            style={{ backgroundColor: "rgba(255, 68, 68, 0.47)"}}
          >
            <Modal.Title>WARNING</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{ backgroundColor: "rgba(255, 68, 68, 0.47)" }}
            className="text-center"
          >
            About to delete employee.
            Are you sure?
          </Modal.Body>
          <Modal.Footer
            style={{ backgroundColor: "rgba(255, 68, 68, 0.47)" }}
          >
            <Button variant="secondary" onClick={handleCloseConfirmDeletion}>
              No
            </Button>
            <Button variant="danger" onClick={()=>{handleDeleteEmployee(deleteEmployee.id)}}>
              Yes
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
            <div className="d-grid gap-2">
              <Button variant="primary" onClick={()=>{handleShowEmployeeDetails(value.id)}}>
                Update Employee Details
              </Button>
              <Button variant="danger" onClick={()=>{handleShowConfirmDeletion(value.id)}}>
                Delete Employee
              </Button>
            </div>
        </div>
      ))}
    </div>
    
  );
}

export default App;
