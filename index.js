const express = require('express')
const app = express()
const host = 5000
app.use(express.json())

const cors = require('cors')
app.use(cors())

let menuItems = [];

app.post('/menu-items',(req,res)=>{
    const item = {
        id : menuItems.length + 1,
        name : req.body.name,
        description : req.body.description,
        ingredients: req.body.ingredients,
        price: req.body.price,
        category: req.body.category
    }
    menuItems.push(item)
    res.status(201).json(item)
})


app.get('/menu-items',(req,res)=>{
    res.json(menuItems)
})


app.get('/menu-items/:category',(req,res)=>{

    const answer = [];

    for(let i=0;i<menuItems.length;i++){
        const element = menuItems[i];
        if(element.category==req.params.category){
            answer.push(element);
        }
    }

    if(answer.length > 0){
        res.json(answer);
    } 
    else{
        res.json({
            "msg" : "Menu item not found"
        })
    }
})


app.put('/menu-items/:id',(req,res)=>{
    const updatedItem = req.body;
    for(let i=0;i<menuItems.length;i++){
        const element = menuItems[i];
        if(element.id==req.params.id){
            menuItems[i] = {...element,...updatedItem}
            res.json(menuItems[i])
            return;
        }
    }
    res.json({
        "msg" : "Menu item not found"
    })
})


app.delete('/menu-items/:id', (req,res)=>{
    for(let i=0;i<menuItems.length;i++){
        const element = menuItems[i];
        if(element.id==req.params.id){
            menuItems.splice(i,1)
            for(let j=i;j<menuItems.length;j++){
                menuItems[j].id = j+1;
            }
            res.json(element)
            return;
        }
    }
    res.json({
        "msg" : "Menu item not found"
    })
})


app.listen(host,()=>{
    console.log("server started...")
})

