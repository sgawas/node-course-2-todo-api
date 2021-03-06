const expect = require('expect');
const request = require('supertest');
const  {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id : new ObjectID(),
    text : 'first test todo'
},{ 
    _id : new ObjectID(),
    text : 'second test todo',
    completed: true,
    completedAt : 33334
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos',() => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text2';
        
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) =>{
                expect(res.body.text).toBe(text);
            })
            .end((err,res) => {
                if(err){
                    return done(err);
                }
               Todo.find({text}).then((todos) => {
                   expect(todos.length).toBe(1);
                   expect(todos[0].text).toBe(text);
                   done();
               }).catch((err) =>{
                   done(err);
               })
            })
    });

    it('should not create todo with invalid body data',(done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res) => {
                if(err){
                    return done(err);
                }
                Todo.find().then((todos)=> {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) =>done(e));
            })
    });
});

describe('GET /todos',() =>{
    it('should get all todos', (done) =>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect((res.body.todos.length)).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) =>{
        var hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) =>{
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos', ()=>{
    it('should remove the todo', (done)=> {
        
        var hexId = todos[1]._id.toHexString();
        
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err,res) =>{
                if(err){
                    return done(err);
                }
                Todo.findById(hexId).then((todo)=>{
                    expect(todo).toNotExist();
                    done();
                }).catch((err) =>{
                    done(err);
                })
            });
    });

    it('should return 404 if todo not found', (done) =>{
        var hexId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) =>{
        request(app)
            .delete(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', ()=>{
    it('should update the todo' ,(done) =>{
        var hexId = todos[0]._id.toHexString();
        var text = 'updated text todo';

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed:true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.text).toBe(text);
                expect(res.body.todos.completed).toBe(true);
                expect(res.body.todos.completedAt).toBeA('number');
            })
            .end(done);
    });

    it('should clear the completedAt when todo is not completed' ,(done) =>{
        var hexId = todos[1]._id.toHexString();
        var text = 'This should be the new text!!';

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
            completed: false,
            text
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.text).toBe(text);
            expect(res.body.todos.completed).toBe(false);
            expect(res.body.todos.completedAt).toNotExist();
        })
        .end(done);
    });
});