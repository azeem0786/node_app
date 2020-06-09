var express = require("express");
var http = require("http");

var app = express();
var server = http.Server(app);
var io = require("socket.io")(server);
var users = [];

server.listen(3333, function () {
    console.log("the server is running at the port 3333");  
});

/*link external file start*/
app.get("/", function (reg, res) {
      res.sendFile(__dirname + "/index.html");  
});
app.get("/css/style.css", function (reg, res) {
      res.sendFile(__dirname + "/css/style.css");  
});
app.get("/css/back.png", function (reg, res) {
      res.sendFile(__dirname + "/css/back.png");  
});
app.get("/css/responsive.css", function (reg, res) {
      res.sendFile(__dirname + "/css/responsive.css");  
});
app.get("/css/send.png", function (reg, res) {
      res.sendFile(__dirname + "/css/send.png");  
}); 
app.get("/js/jquery-3.3.1.min.js", function (reg, res) {
      res.sendFile(__dirname + "/js/jquery-3.3.1.min.js");  
});/*link external file end*/


io.on("connection", function(socket){
   var name = "";
    socket.on("has connected", function(username){
        name = username;
        users.push(username);
        io.emit("has connected", {username: username,userslist: users} );
        
    });
    
    socket.on("disconnect", function(){
       users.splice(users.indexOf(name), 1);
        io.emit("has disconnected", {username: name,userslist: users});
    });
    
    socket.on("new message", function(message){
       io.emit("new message", message); 
        
        
    });
    
    
});




























