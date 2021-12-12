const express = require('express');
const mysql = require('mysql')
const app = express()
const PORT = 3000;

const connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'WDREa8TXDb',
    database:'mydb'
})

connection.connect(function(err){
    if(err){
        console.log(err.code)
        console.log(err.fatal)
    }else{
        console.log("Connected!")
    }
})

app.use(express.json())


app.get('/', (req,res) => {
    res.status(200).send({
        "platillos" : "http://127.0.0.1:3000/platillos",
        "menu-del-dia" : "http://127.0.0.1:3000/menudeldia"
    })
})

//menu del dia
app.get('/menudeldia', (req, res) => {   
    $query = 'SELECT M.fecha, P.nombre FROM menus_del_dia MD INNER JOIN menus M ON MD.menus_id = M.id INNER JOIN platillos P ON MD.platillos_id = P.id WHERE M.id = (SELECT id FROM menus WHERE fecha = curdate());'
    consultar(req,res,$query);
})

app.get('/platillos', (req,res) => {
    $query = 'SELECT * FROM platillos'
    consultar(req,res,$query);
})


const consultar = async (req,res,$query) => {
    connection.query($query, await function(err,rows,flieds){
        if(err){
            console.log(`Error al ejecutar la query. Error: ${err}`)
            return;
        }

        console.log("Consulta ejecutada con exito ",rows)

        res.status(200).send({
            rows
        })
    })
}


app.listen(PORT, () => console.log(`Server running on port:${PORT}`))



