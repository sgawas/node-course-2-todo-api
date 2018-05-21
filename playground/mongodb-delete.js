//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');   // destructuring of objects
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) => {

    if(err){
        return console.log('Unable to connect to mongodb server');
    }
    console.log('connected to mongodb server');

    const db = client.db('TodoApp');

    // delete many
    // db.collection('Todos')
    //     .deleteMany({text:'Eat lunch'}).then((res)=> {
    //         console.log(res);
    //     },(err) =>{
    //         console.log('unable to delete todos ',err);
    //     }
    // );
    
     // delete one
    //  db.collection('Todos')
    //  .deleteOne({text:'Eat lunch'}).then((res)=> {
    //      console.log(res);
    //  },(err) =>{
    //      console.log('unable to delete todos ',err);
    //  }
    // );
    
     // find one and delete
    //  db.collection('Todos')
    //  .findOneAndDelete({completed:false}).then((res)=> {
    //      console.log(res);
    //  },(err) =>{
    //      console.log('unable to delete todos ',err);
    //  }
    // );   

    // db.collection('Users')
    //     .deleteMany({name:'Suraj Gawas'}).then((res)=> {
    //         console.log(res);
    //     },(err) =>{
    //         console.log('unable to delete todos ',err);
    //     }
    // );

    db.collection('Users')
        .findOneAndDelete({
            _id : new ObjectID('5b01fff7481604dd4bb5866a')
        }).then((res)=> {
            console.log(res);
        },(err) =>{
            console.log('unable to delete todos ',err);
        }
    );

    client.close();
});