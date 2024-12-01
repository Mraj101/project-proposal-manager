require('dotenv').config()
const mongoose = require('mongoose');
const { dbName } = require("./constants.js");
const DbConnect = require("./db/index.js"); 
const {app} = require('./app.js');
const router = require('./routesManager.js');

DbConnect().then(()=>{
    app.listen(process.env.PORT||5000,()=>{
        console.log(`app listening on port: ${process.env.PORT} `);
        app.on("error",(error)=>{
            console.log("err:",error);
            throw Error;
        })
    })
    router();
})
.catch(error=>{
    console.log('mongo db connection failed !!, ',error)
})


