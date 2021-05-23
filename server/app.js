const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'blaketyler1',
//     database: 'tododb'
// })

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.get('/', (req, res) => {
//     const sqlInsert = "INSERT INTO `todos` (todoTitle, isCompleted) VALUES ('Clean the house', 1);";
//     connection.query(sqlInsert, (err, result) => {
//         if(err){
//             console.log(err);
//             return reject(err);
//         }
//         else{
//             console.log("Insert ID: ", result.insertId);
//             res.send('hello asd');
//         }
        
//     })
    
// })

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM tododb.todos;";
    connection.query(sqlSelect, (err, result) => {
        if(err){
            console.log(err);
            return reject(err);
        }
        else{
            res.send(result);
        }
    })
});

app.post("/api/insert", (req,res) => {
    const todoTitle = req.body.todoTitle;
    const isCompleted = req.body.isCompleted;

    const sqlInsert = "INSERT INTO `todos` (todoTitle, isCompleted) VALUES (?,?);";
    connection.query(sqlInsert, [todoTitle, isCompleted], (err, result) => {
        if(err){
            console.log(err);
            return reject(err);
        }
        else{
            console.log("Insert ID: ", result.insertId);
        }
    })
});

app.delete("/api/delete/:id", (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    const sqlDelete = "DELETE FROM tododb.todos WHERE id = ?";

    connection.query(sqlDelete, id, (err, result) => {
        if(err){
            console.log(err);
            return reject(err);
        }
        else{
            console.log("Delete ID: ", result.insertId);
        }
    })
});

app.put("/api/update", (req, res) => {
    console.log(req.body);
    const todoTitle = req.body.todoTitle;
    const isCompleted = req.body.isCompleted;
    const sqlUpdate = "UPDATE tododb.todos SET isCompleted = ? WHERE todoTitle = ? ";

    connection.query(sqlUpdate, [isCompleted, todoTitle], (err, result) => {
        if(err){
            console.log(err);
            return reject(err);
        }
        else{
            console.log("Update ID: ", result.insertId);
        }
    }) 
})




//Create database connection
console.log('Creating connection...\n');
let connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'blaketyler1',
    database: 'tododb',
});

//Connect to the database
connection.connect((err) => {
    console.log('Connecting to database...\n');

    //Handle errors
    if(err){
        console.log(err);
        console.log('Exiting application...\n');
    }
    else{
        console.log('Connected to database...\n');
        //Listens for connections
        //Will terminate with error if database connection is closed
        const ip = 'localhost';
        const port = 3001;
        app.listen(port, ip, () => {
            try{
                console.log(`listening on port ${port}`);
            }
            catch(err){
                console.log(err);
            }
        })
    }
})