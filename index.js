//set up socket and express server
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//to access API.AI
var apiai = require('apiai');
var APIAI_KEY = apiai("76919fa1f2184bcba1370ed5b6cca048");

//passes the index with the chat format to the / route
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//socket.io and API.AI integration
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
      var request = APIAI_KEY.textRequest(msg);

      request.on('response', function(response) {
            io.emit('chat message', msg);
          
     setTimeout(function() {
        io.emit('chat message', response.result.fulfillment.speech);
        }, 1500); 
      });
      
      request.on('error', function(error) {
            console.log("**Error!**");
      });
      request.end();
  });
});


//spin up server on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});