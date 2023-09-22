import React from 'react';

function EmployeeList({ employeeList }) {
  return (
    <div className='App'>
      {employeeList.map((value, key) => (
        <div className='employee-display-container' key={key}>
          <div className='employee-display-content'>
            <h3>Name: {value.name} </h3>
            <h3>Age: {value.age} </h3>
            <h3>Country: {value.country}</h3>
            <h3>Position: {value.position}</h3>
            <h3>Wage: {value.wage}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;