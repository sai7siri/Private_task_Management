const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const app = express();
const path = require('path');

require("dotenv").config();

const allRoutes = require("./routes/userRoutes");

// middlewares
const _dirname = path.resolve();

 app.use(cors({
   origin: "http://localhost:5173",
   methods : ["POST" , "PUT" , "GET" , "DELETE"],
   allowedHeaders : ['Content-Type' , 'Authorization'], 
   credentials: true,
 }));


app.use(express.json());

//  port
const port = process.env.PORT;

//  all routess
app.use("/api/v1", allRoutes);

app.use(express.static(path.join(_dirname , "/client/dist")));

app.get( '*', (_,res)=>{
   res.sendFile(path.resolve(_dirname , "client" , "dist" , "index.html"));
} );



app.get("/", (req,res)=>{
   res.send("<h1>hey there taskmanagement??</h1>")
})

app.listen(port , ()=>{
   console.log("server is running 7070")
});

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("atlas DB CONNects"))
.catch((err)=> console.log("network || DB connection error " , err));
