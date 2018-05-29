const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.POST || 3000;
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {user} = require('./models/user');
var {ObjectID} = require('mongodb');


var app =express();

app.use(bodyParser.json());

app.post('/todos', (req,res)=>{
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req,res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    },(err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id',(req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
       return res.status(404).send();
    }
    Todo.findById(id).then((todos) => {
        if(!todos){
            return res.status(404).send();
        }
        res.send({todos});
    }).catch((err) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id',(req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if (!todo){
            return res.status(404).send();
        }
        res.send(todo);
    }).catch((err)=>{
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
           return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send(e);
    })
})

app.post('/users', (req,res) => {
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);

    user.save().then((user) => {
        res.send(user);
    }).catch((e) =>{
        res.status(400).send(e);
    })
})

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
});

module.exports = {
    app
};