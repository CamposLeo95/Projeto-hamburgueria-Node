const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()
const port = 3000
const orders = [] 

app.use(express.json())

const checkId = (req, res, next)=>{
    const { id } = req.params
    const index = orders.findIndex(order => order.id === id)

    if(index < 0){
        console.log(index);
        return res.status(404).json({mensage: 'order not found'})
    }

    req.useId = id
    req.useIndex = index

    next()

}

// - OK
app.get('/order', (req, res) =>{

    return res.json(orders)
})

// - OK
app.get('/order/:id', checkId, (req, res) =>{
    const id = req.useId
    const pedido = orders.filter(order => order.id == id)

    return res.json(pedido)
})

// - OK
app.post('/order', (req, res) =>{

    const {order, clientName, price} = req.body  

    orders.push({id: uuidv4(), order, clientName, price, status: "Em preparação"})

    return res.json({mensage: 'Pedido realizado'})

})

// - OK
app.put('/order/:id', checkId, (req, res) =>{
    const id = req.useId
    const index = req.useIndex

    const {order, clientName, price} = req.body

    orders[index] = {id, order, clientName, price, status: "Em preparação"}

    return res.json({mensage: 'Pedido alterado'})
})

// - OK
app.patch('/order/:id', checkId, (req, res) =>{
    const index =req.useIndex

    orders[index]['status'] = 'Pronto'

    return res.json({mensage: 'Pedido pronto'})
})

// - OK
app.delete('/order/:id', checkId, (req, res) =>{
    const index = req.useIndex

    orders.splice(index, 1)

    return res.json({mensage: 'Item removido'})
})


app.listen(port, err =>{
    if(err){
        console.log(err);
    }
    console.log('Server On!');
})

