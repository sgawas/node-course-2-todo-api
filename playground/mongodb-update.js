//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');   // destructuring of objects
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) => {

    if(err){
        return console.log('Unable to connect to mongodb server');
    }
    console.log('connected to mongodb server');

    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b0260467cd159af947e5e70')
    // },{
    //     $set:{
    //         completed: true
    //     }    
    // }, {
    //     returnOriginal: false
    // }).then((res) => {
    //     console.log(res);
    // })

    // db.collection('Users').findOneAndUpdate({
    //     _id: new ObjectID('5b01fe0e7d0ac9dcdf09d736')
    // },{
    //     $set:{
    //         name: 'Suraj'
    //     }    
    // }, {
    //     returnOriginal: false
    // }).then((res) => {
    //     console.log(res);
    // })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b01fe0e7d0ac9dcdf09d736')
    },{
        $inc:{
            age: -1
        }    
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    })

    client.close();
});