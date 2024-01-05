const express = require('express')
const app = express()
const host = 3000 
const mongoose = require('mongoose')
app.use(express.json()) 

const cors = require('cors') 
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/MenuLite');
const db = mongoose.connection;
db.once('open',()=>{ 
    console.log("DB Connected...")
})

const Item = mongoose.model('Item',{
    serialNo : Number,
    name: String,
    description: String,
    ingredients: String,
    price: Number,
    category: String
})


const User = mongoose.model('User',{
    name: String,
    mail: String,
    contact: Number,
    pwd: String
})

const Appointment = mongoose.model('Appointment', {
    name: String,
    guests: Number,
    date: Date,
    time: String,
})


app.post('/register',async(req,res)=>{

    try{

        const existingUser = await User.findOne({mail : req.body.mail})

        if(existingUser){
            return res.status(409).json({
                    "msg" : "user with mail already exists"
            })
        }

        const newUser = new User({
            name : req.body.name,
            mail : req.body.mail,
            contact : req.body.contact,
            pwd : req.body.pwd
        })
        const saveUser = await newUser.save()
        res.status(201).json(saveUser)
    }
    catch(error){
        res.json(error)
    }

})


app.post('/login',async(req,res)=>{

    try{

        const user = await User.findOne({mail : req.body.mail, pwd : req.body.pwd})
        
        if(!user){
            return res.status(401).json({
                "msg" : "Invalid Credentials"
            })
        }

        res.json({
            "msg" : "Login Successful",
            "user" : user
        })

    }
    catch(error){
        res.json(error)
    }

})

app.post('/addItem',async(req,res)=>{ 

    try{
        const newItem = new Item({
            serialNo : req.body.serialNo,
            name : req.body.name,
            description : req.body.description,
            ingredients: req.body.ingredients,
            price: req.body.price,
            category: req.body.category
        })
        const saveItem = await newItem.save(); 
        res.status(201).json(saveItem) 
    }
    catch(error){ 
        res.json(error)
    }

})


app.get('/getAllItems',async(req,res)=>{

    try{
        const items = await Item.find();
        res.json(items);
    }
    catch(error){
        res.json(error)
    }

})


app.get('/getItem/:category',async(req,res)=>{

    try{
        const item = await Item.find({category : req.params.category})

        if(!item){
            return res.json(
                {
                    "msg" : "no item with category found"
                }
            )
        }

        res.json(item)
    }
    catch(error){
        res.json(error)
    }
})


app.put('/updateItem/:serialNo',async(req,res)=>{

    try{
        const updatedItem = await Item.findOneAndUpdate( 
            {serialNo: req.params.serialNo},
            req.body,
            {new : false}
        )
    
        if(!updatedItem){
            res.json(
                {
                    "msg" : "no item with id found"
                }
            )
        }
    
        res.json(updatedItem)
    }
    catch(error){
        res.json(error)
    }

})


app.delete('/deleteItem/:serialNo',async(req,res)=>{

    try{
        const deletedItem = await Item.findOneAndDelete({serialNo: req.params.serialNo})

        if(!deletedItem){
            res.json(
                {
                    "msg" : "no item with id found"
                }
            )
        }

        const itemsToUpdate = await Item.find({ serialNo: {$gt: deletedItem.serialNo} })

        for(const item of itemsToUpdate){
            item.serialNo-=1;
            await item.save();
        }
        
        res.json(deletedItem);
    }
    catch(error){
        res.json(error)
    }
})


app.post('/book-appointment',async(req,res)=>{

    try {
        
        const existingAppointment = await Appointment.countDocuments({
            date: req.body.date,
            time: req.body.time,
        });

        const maxAppointments = 5;

        if(existingAppointment >= maxAppointments) {
            return res.status(409).json({
                "msg": "Time slot not available"
            })
        }

        const newAppointment = new Appointment({
            name: req.body.name,
            guests: req.body.guests,
            date: req.body.date,
            time: req.body.time,
        });

        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);

    } 
    catch(error){
        res.json(error);
    }
})


app.get('/view-appointment/:name',async(req,res)=>{

    try{
        const bookedUser = await Appointment.findOne({name: req.params.name})

        if(bookedUser){
            return res.json(bookedUser)
        }

        return res.status(404).json({"msg" : "No appointment found"})
    }
    catch(error){
        res.json(error)
    }
})


app.delete('/delete-appointment/:name',async(req,res)=>{

    try{
        const deletedAppointment = await Appointment.findOneAndDelete({name: req.params.name})

        if(deletedAppointment){
            return res.json({"msg" : "Appointment deleted"})
        }

        return res.status(404).json({"msg" : "No appointment found"})
    }
    catch(error){
        res.json(error)
    }
})



app.listen(host,()=>{
    console.log("server started...")
})












// const express = require('express')
// const app = express()
// const host = 5000
// app.use(express.json())

// const cors = require('cors')
// app.use(cors())

// let menuItems = [];

// app.post('/menu-items',(req,res)=>{
//     const item = {
//         id : menuItems.length + 1,
//         name : req.body.name,
//         description : req.body.description,
//         ingredients: req.body.ingredients,
//         price: req.body.price,
//         category: req.body.category
//     }
//     menuItems.push(item)
//     res.status(201).json(item)
// })


// app.get('/menu-items',(req,res)=>{
//     res.json(menuItems)
// })


// app.get('/menu-items/:category',(req,res)=>{

//     const answer = [];

//     for(let i=0;i<menuItems.length;i++){
//         const element = menuItems[i];
//         if(element.category==req.params.category){
//             answer.push(element);
//         }
//     }

//     if(answer.length > 0){
//         res.json(answer);
//     } 
//     else{
//         res.json({
//             "msg" : "Menu item not found"
//         })
//     }
// })


// app.put('/menu-items/:id',(req,res)=>{
//     const updatedItem = req.body;
//     for(let i=0;i<menuItems.length;i++){
//         const element = menuItems[i];
//         if(element.id==req.params.id){
//             menuItems[i] = {...element,...updatedItem}
//             res.json(menuItems[i])
//             return;
//         }
//     }
//     res.json({
//         "msg" : "Menu item not found"
//     })
// })


// app.delete('/menu-items/:id', (req,res)=>{
//     for(let i=0;i<menuItems.length;i++){
//         const element = menuItems[i];
//         if(element.id==req.params.id){
//             menuItems.splice(i,1)
//             for(let j=i;j<menuItems.length;j++){
//                 menuItems[j].id = j+1;
//             }
//             res.json(element)
//             return;
//         }
//     }
//     res.json({
//         "msg" : "Menu item not found"
//     })
// })


// app.listen(host,()=>{
//     console.log("server started...")
// })

