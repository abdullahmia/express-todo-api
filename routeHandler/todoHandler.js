const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

// importing the todoSchema
const todoSchema = require('../schemas/todoSchema');

// creating a todo model
const Todo = new mongoose.model("Todo", todoSchema);

/*
===============================================
        Todo Router & Views
===============================================
*/

// get all the todos
router.get('/', async (req, res) => {
    await Todo.find({status: 'active'}, (err, data) => {
        if(err){
            res.status(500).json({
                error: "there was a server error"
            })
        }else {
            res.status(200).json({
                result: data
            })
        }
    });
});

// get a single todo by id
router.get('/:id', async (req, res) => {
    await Todo.find({_id: req.params.id}, (err, data) => {
        if(err){
            res.status(500).json({
                error: "there was a server side error"
            })
        }else{
            res.status(200).json({
                result: data,
                message: "success"
            })
        }
    })
});

// add a todo
router.post('/new', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((err) => {
        if(err){
            console.log(err);
            res.status(500).json({
                error: "There was a server side error"
            })
        } else {
            res.status(200).json({
                message: "Todo Added Successfull"
            })
        }
    })
})

// edit a signle todo 
router.put('/edit/:id', async (req, res) => {
    const filter = {_id: req.params.id}
    const update = {status: "active"}

    const result = await Todo.findOneAndUpdate(filter, update, {new: true});
    res.status(200).json({
        message: "Todo update",
        data: result
    });
});

// delete a single todo
router.delete('/delete/:id', async (req, res) => {
    await Todo.deleteOne({_id: req.params.id}, (err) => {
        if(err){
            res.status(500).json({
                error: "there was a server error"
            })
        }else {
            res.status(200).json({
                message: "Todo deleted"
            })
        }
    })
});


module.exports = router;