import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import EmployeeList from './component/comp_EmployeeList';

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

      <EmployeeList employeeList={employeeList} />
    </div>
    
  );
}

export default App;