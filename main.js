const express = require('express')
const app = express()
const db = require('./index.js')

app.use(express.urlencoded())
app.use(express.json())
const DB = new db('data')

app.get('/', (req, res) => {
    res.send({error:false})
    }
)
app.get('/usuarios', async (req, res) => {
    const data = await DB.getAllUsers()
    return res.send(data)
    }
)
app.get('/usuario', async (req, res) => {
    const {id} = req.query
    try{
        const data = await DB.getUserID(id)
        return res.send(data)
    }catch(e){
        return res.status(404).send({error:true, msg:e.message})
    }

})

app.post('/usuario', async (req, res) => {
    const {nombre,correo} = req.body
    const data = await DB.createUser({nombre,correo});
    return res.send({error:false, msg:"Usuario Creado", data})
})
app.listen(8080, () => {
    console.log('listening on port 8080')
    }
)