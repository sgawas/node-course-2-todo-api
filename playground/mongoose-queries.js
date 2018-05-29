const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectId} = require('mongodb');
const  {user} = require('./../server/models/user');

var user_id = '5b07a1aeecc2b1f1d52d3027';

var id = '5b06659e8643d067abfc529a';

if(!ObjectId.isValid(id)){
    console.log('Id not found')
}

Todo.find({
    _id : id
}).then((todos) => {
    console.log('Todos ',todos);
});

Todo.findOne({
    _id : id
}).then((todo) => {
    console.log('Todo', todo);
});

Todo.findById(id).then((todos) => {
    if(!todos){
        return console.log('Todo not found');
    }
    console.log('Todos by Id ',todos);
}).catch((e) => {
    console.log(e);
});

user.findById({
    _id: user_id
}).then((users) => {
    if(!users){
        return console.log('user not found');
    }
    console.log('Users ',users);
}).catch((err) =>{
    console.log(err);
})