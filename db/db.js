const mongooes = require('mongoose');

mongooes.set('strictQuery', true)

mongooes.connect("mongodb://0.0.0.0:27017/UsersEntries").then(() =>{
    console.log("Connected to MongoDB");
}).catch(error => console.log(`No Connection! ${error}`));