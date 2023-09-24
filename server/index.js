import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express();

app.use(express.json())
app.use(cors())


const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "#MetaPass1234",
    database: "employee_system",
})


app.post("/create",(req,res)=>{
    const q = "INSERT INTO employees (name,age,country,position,wage) VALUES (?)"
    const val = [
        req.body.name,
        req.body.age,
        req.body.country,
        req.body.position,
        req.body.wage
    ]

    db.query(q,[val],    
        (err, result)=>{
            if (err){
                res.json(err);
            }
            else{
                res.send(result)
            }
        });
});

app.get("/employees", (req, res) => {
    const q = "SELECT * FROM employees" 
    db.query(q,
    (err, result)=>{
        if (err){
            res.json(err);
        }
        else{
            res.send(result)
        }
    });
});

app.delete("/delete-employee/:id",(req,res)=>{
    const q = "DELETE FROM employees WHERE id = ?"
    const data_id = req.params.id;

    db.query(q, data_id,
    (err,result)=>{
        if (err) {
            console.error("Error:", err);
        } else {
            res.send(result);
        }
    })
})


app.put("/update-employee/:id", async (req,res)=>{
    const employeeId = req.params.id;
    const q = "UPDATE employees SET `name` = ?, `age` = ?, `country` = ?, `position` = ?, `wage` = ? WHERE id = ?";

    const val = [
        req.body.employeeName,
        req.body.employeeAge,
        req.body.employeeCountry,
        req.body.employeePosition,
        req.body.employeeWage,
        employeeId
    ]

    db.query(q,[...val],(err,result)=>{
        if (err){
            console.error(err);
        }
        else{
            res.json({ message: 'Employee updated successfully' });
        }
    });
})

app.listen(5001, ()=>{
    console.log("Server running on port 5001")
});