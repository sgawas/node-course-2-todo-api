const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id : 10
};
var token = jwt.sign(data, '123abc');  // your data and secret key
console.log(token);  // header (algorithm, type), payload(data), verify signature

var decode = jwt.verify(token, '123abc');
console.log(decode);

// var message = 'I am using number 3';
// var hash = SHA256(message).toString();

// console.log('message: ',message);
// console.log('hash: ',hash);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+ 'abcd').toString()
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var res = SHA256(JSON.stringify(token.data) + 'abcd').toString();

// if(res === token.hash){
//     console.log('data trusted');
// }
// else {
//     console.log('data not trusted');
// }