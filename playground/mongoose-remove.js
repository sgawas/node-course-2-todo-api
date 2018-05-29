const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectId} = require('mongodb');
const  {user} = require('./../server/models/user');


// Todo.remove({}).then((result) => { 
//     console.log(result);
// });

Todo.findOneAndRemove({
    _id: '5b0884037189b481e6847533'
}).then((todo) =>{
    console.log(todo);
});