//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');   // destructuring of objects

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) => {

    if(err){
        return console.log('Unable to connect to mongodb server');
    }
    console.log('connected to mongodb server');
  //  const db = client.db('TodoApp');
    
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result)=> {
    //     if(err){
    //         return console.log('unable to insert record to todoApp')
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // }
    // );

    // db.collection('Users').insertOne({
    //     name: 'Suraj Gawas',
    //     age: 33,
    //     country: 'India' 
    // }, (err, result)=> {
    //     if(err){
    //         return console.log('unable to insert record to todoApp')
    //     }
    //   //  console.log(JSON.stringify(result.ops, undefined, 2));
    //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    // }
    // );
    client.close();
});