const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/TodoApp');
mongoose.connect('mongodb://localhost:27017/Users');
// var Todo = mongoose.model('Todo',{
//     text: {
//         type: String,
//         required: true,
//         minlength: 1,   // min length of string should be 1
//         trim: true      //removes trailing and preceeding spacess
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default: null
//     }
// });

// var newTodo = new Todo({
//     text: 'Cook dinner in sometime'   // tex: true / 12   converts into string
    
// });

// newTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined,2));
// },(error) =>{
//     console.log('unable to save todo');

// });

var users = mongoose.model('users',{
    email:{
        type: String,
        minlength: 1,
        required: true,
        trim: true
    },
    password:{
        type: String
    }
})

var newUser = new users({
    email: 'suraj@email.com'
});

newUser.save().then((doc) =>{
    console.log(JSON.stringify(doc, undefined, 2));
},(err) =>{
    console.log(err);
})