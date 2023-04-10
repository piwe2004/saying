const express = require('express')
const fs = require('fs')
const cors = require('cors')

const data = JSON.parse(fs.readFileSync('./src/data.json', 'utf-8'))

// console.log(data);

const app = express();

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    const {author, message} = req.query

    let _data = data

    res.json(data
        .filter(value => author ? value.author.includes(author) : true)
        .filter(value => message ? value.message.includes(message) : true))
});

app.get('/random', (req,res)=> {
    const ranNum = Math.floor((Math.random() * data.length))
    res.json(data[ranNum]);
})

app.get('/:id', (req, res) => {
    const {id} = req.params

    if(isNaN(id)){
        res.json({
            rs:false,
            msg:"id is not number"
        })
        return;
    }

    const num = parseInt(id);

    if(num >= data.length || num < 0){
        res.json({
            rs:false,
            msg:"num is not vaild"
        })
        return;
    }

    res.json(data[num])
});

app.post('/', (req, res) => {
    const {author,message} = req.body

    if(!(author && author.length > 0 &&
        message && message.length > 0)){
            res.json({
                rs:false
            })

            return;
    }
        

    data.push({
        author : req.body.author,
        message: req.body.message
    })

    res.json({
        rs: true
    })
    
});

app.put('/:id', (req,res) => {

    const {id} = req.params

    if(isNaN(id)){
        res.json({
            rs:false,
            msg:"id is not number"
        })
        return;
    }

    const num = parseInt(id);

    if(num >= data.length || num < 0){
        res.json({
            rs:false,
            msg:"num is not vaild"
        })
        return;
    }

    const {author,message} = req.body

    console.log(author, message)

    if(!(author && author.length > 0 &&
        message && message.length > 0)){
            res.json({
                rs:false
            })

            return;
    }
        

    data[num]=({
        author : req.body.author,
        message: req.body.message
    })

    res.json({
        rs: true
    })
})

app.delete('/:id', (req,res) => {
    const {id} = req.params

    if(isNaN(id)){
        res.json({
            rs:false,
            msg:"id is not number"
        })
        return;
    }

    const num = parseInt(id);

    if(num >= data.length || num < 0){
        res.json({
            rs:false,
            msg:"num is not vaild"
        })
        return;
    }

    data.splice(num,1)

    res.json({
        rs: true
    })
})

app.listen(8080, () => {
    console.log('start server')
})
