const util = require('util');
const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const ddl = `CREATE TABLE IF NOT EXISTS people(id int NOT NULL AUTO_INCREMENT, name VARCHAR(20), PRIMARY KEY (id))`
connection.query(ddl)

app.get('/',  (req,res) => {
    const query = util.promisify(connection.query).bind(connection);
    (async () => {
        let responseHTML = '<h1>Full Cycle</h1> <ul>'
        await query(`INSERT INTO people(name) values('${req.query.name}')`)
        const rows = await query('select * from people');
        rows.forEach(item => {
            responseHTML += `<li>${item.name}</li>`
        });
        responseHTML += `</ul>`
        res.send(responseHTML)       
    })()
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})