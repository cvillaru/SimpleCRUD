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

// app.get("/",(req,res)=>{
//     res.json("Hello From Backend")
// })

app.post("/create",(req,res)=>{
    const q = "INSERT INTO employees (name,age,country,position,wage) VALUES (?)"
    const val = [
        req.body.name,
        req.body.age,
        req.body.country,
        req.body.position,
        req.body.wage
    ]

    // const name = req.body.name
    // const age = req.body.age
    // const country = req.body.country
    // const position = req.body.position
    // const wage = req.body.wage


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

app.listen(5001, ()=>{
    console.log("Server running on port 5001")
});