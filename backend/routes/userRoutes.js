const routes = require("express").Router();
const {authenticated} = require('../middlewares/verifyToken')

const {
  addUser,
  loginUser,
  logOut,
  getUser,
} = require("../conrollers/userContrler");

const {createTask, getAllTasks, deleteTask , updateTask , updateImportant, updateComplete , getComplete , getImportant} = require("../conrollers/taskCon")

const { upload } = require("../middlewares/cloudinaryStore");

// routes

routes.post("/signup", upload.single("profile"), addUser);

routes.post("/signin", loginUser);

routes.get("/getuser" ,authenticated ,getUser )

routes.get("/logout", logOut);


// task routes

routes.post("/addtask" , authenticated , createTask);

routes.get("/getalltask" , authenticated , getAllTasks);

routes.delete("/deletetask/:id" , authenticated , deleteTask);

routes.put("/updatetask/:id" , authenticated , updateTask);

routes.put("/updateimportant/:id" , authenticated , updateImportant);

routes.put("/updatecomplete/:id" , authenticated , updateComplete);

routes.get("/getcomplete" , authenticated , getComplete);

routes.get("/getimportant" , authenticated , getImportant);






module.exports = routes;
